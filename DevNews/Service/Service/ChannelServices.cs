﻿using Entity.Channel;
using Entity.User;
using Microsoft.AspNetCore.Http;
using Service.Rules;
using Services.Base;
using System.Linq;
using Tools.Crypto;
using Tools.FileTools;
using ViewModel.Channel;
using ViewModel.File;

namespace Service.Service;

public class ChannelServices : IChannelRules
{
    private readonly IBaseRules<Channel> _channelCrud;

    private readonly IBaseRules<ChannelsUsers> _channelsUsersCrud;

    private readonly IBaseRules<ChannelsAdmins> _channelsAdminsCrud;

    private readonly IBaseRules<Entity.Article.File> _fileCrud;

    private readonly IAccountRules _account;

    public ChannelServices(IBaseRules<Channel> channelCrud, IAccountRules account,
        IBaseRules<ChannelsUsers> channelsUsersCrud, IBaseRules<Entity.Article.File> fileCrud, IBaseRules<ChannelsAdmins> channelsAdminsCrud)
    {
        _channelCrud = channelCrud;
        _account = account;
        _channelsUsersCrud = channelsUsersCrud;
        _fileCrud = fileCrud;
        _channelsAdminsCrud = channelsAdminsCrud;
    }

    public async Task<bool> CheckLinkAsync(string link)
        => await Task.FromResult(await _channelCrud.AnyAsync(c => c.Link == link));

    public async Task<UpsertChannelResponse> CreateAsync(UpsertChannelViewModel insert, IHeaderDictionary headers)
        => await Task.Run(async () =>
        {
            var user = await _account.GetUserBySessionAsync(headers);
            if (user != null)
            {
                Channel newChannel = new()
                {
                    About = "",
                    CreateDate = DateTime.Now,
                    Link = insert.Link,
                    Name = insert.Name,
                    OwnerId = user.Id,
                    Token = $"Token_{Guid.NewGuid().ToString().CreateSHA256()}_Channel",
                    Type = 0,
                };
                if (await _channelCrud.InsertAsync(newChannel))
                {

                    SaveFileResponse saveChannelAvatar = await new SaveFileViewModel(insert.Avatar.Base64, "Files/Channel").SaveFileAsync();

                    Entity.Article.File channelAvatar = new()
                    {
                        CreateDate = DateTime.Now,
                        Directory = "Files/Channel",
                        Name = saveChannelAvatar.Name,
                        Type = insert.Avatar.Type ?? saveChannelAvatar.Type,
                        ObjectType = (short)ChannelAvatarType.Main,
                        OrginalName = insert.Avatar.OgName,
                        Size = saveChannelAvatar.Size,
                        ObjectId = newChannel.Id
                    };
                    await _fileCrud.InsertAsync(channelAvatar);
                    return new UpsertChannelResponse(ChannelsStatus.Success, await GetChannelPreviewViewModelAsync(newChannel));
                }
                return new UpsertChannelResponse(ChannelsStatus.Exception, null);
            }
            return new UpsertChannelResponse(ChannelsStatus.Exception, null);
        });

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<ChannelPreviewViewModel> GetChannelPreviewViewModelAsync(Channel channel)
        => await Task.Run(async () =>
       {
           IEnumerable<Entity.Article.File> channelAvatars = await _fileCrud.GetAsync(ca => ca.ObjectId == channel.Id);
           ChannelPreviewViewModel channelPreview = new(
           Token: channel.Token,
           Name: channel.Name,
           Avatar: channelAvatars,
           NewPosts: 0);
           return channelPreview;
       });

    public async Task<IEnumerable<ChannelPreviewViewModel>> GetChannelPreviewViewModelAsync(IEnumerable<Channel> channels)
        => await Task.FromResult(channels.Select((channel) => GetChannelPreviewViewModelAsync(channel).Result));

    public async Task<GetChannelsResponse> GetChannelsAsync(HttpContext httpContext)
        => await Task.Run(async () =>
        {
            User user = await _account.GetUserBySessionAsync(httpContext.Request.Headers);
            if (user != null)
            {
                IEnumerable<ChannelsUsers> userChannels = await _channelsUsersCrud.GetAsync(uc => uc.UserId == user.Id);
                IEnumerable<ChannelsAdmins> adminChannels = await _channelsAdminsCrud.GetAsync(ac => ac.UserId == user.Id);
                IEnumerable<Channel> channels = userChannels.Select((uc) => _channelCrud.GetAsync(uc.ChannelId).Result);
                IEnumerable<Channel> ownerChannels = await _channelCrud.GetAsync(co => co.OwnerId == user.Id);
                channels = channels.Concat(ownerChannels);
                channels = channels.Concat(adminChannels.Select((ac) => _channelCrud.GetAsync(ac.ChannelId).Result));
                IEnumerable<ChannelPreviewViewModel> channelsViewModel = await GetChannelPreviewViewModelAsync(channels);
                return new GetChannelsResponse(ChannelsStatus.Success, channelsViewModel);
            }
            return new GetChannelsResponse(ChannelsStatus.UserNotFound, null);
        });
}
