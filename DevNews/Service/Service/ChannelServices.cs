using Entity.Article;
using Entity.Channel;
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

    private readonly IBaseRules<User> _userCrud;

    private readonly IBaseRules<ChannelsUsers> _channelsUsersCrud;

    private readonly IBaseRules<ChannelsAdmins> _channelsAdminsCrud;

    private readonly IBaseRules<Entity.Article.File> _fileCrud;

    private readonly IPostRules _post;

    private readonly IAccountRules _account;

    public ChannelServices(IBaseRules<Channel> channelCrud, IAccountRules account,
        IBaseRules<ChannelsUsers> channelsUsersCrud, IBaseRules<Entity.Article.File> fileCrud,
            IBaseRules<ChannelsAdmins> channelsAdminsCrud, IBaseRules<User> userCrud, IPostRules post)
    {
        _channelCrud = channelCrud;
        _account = account;
        _channelsUsersCrud = channelsUsersCrud;
        _fileCrud = fileCrud;
        _channelsAdminsCrud = channelsAdminsCrud;
        _userCrud = userCrud;
        _post = post;
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
                    await SubscribeChannelAsync(newChannel, user);
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

    public async Task<GetChannelsResponse> GetAdminChannelsAsync(HttpContext httpContext)
        => await Task.Run(async () =>
        {
            User user = await _account.GetUserBySessionAsync(httpContext.Request.Headers);
            if (user != null)
            {
                IEnumerable<ChannelsAdmins> adminChannels = await _channelsAdminsCrud.GetAsync(ac => ac.UserId == user.Id);
                IEnumerable<Channel> ownerChannels = await _channelCrud.GetAsync(co => co.OwnerId == user.Id);
                IEnumerable<Channel> channles = adminChannels.Select((ac) => _channelCrud.GetAsync(ac.ChannelId).Result);
                channles = channles.Concat(ownerChannels);
                IEnumerable<ChannelPreviewViewModel> channelsViewModel = await GetChannelPreviewViewModelAsync(channles);
                return new GetChannelsResponse(ChannelsStatus.Success, channelsViewModel);
            }
            return new GetChannelsResponse(ChannelsStatus.UserNotFound, null);
        });

    public async Task<ChannelInfoViewModel> GetChannelAsync(string token, IHeaderDictionary headers)
        => await Task.Run(async () =>
        {
            User user = await _account.GetUserBySessionAsync(headers);
            if (user != null)
            {
                Channel channel = await GetChannelByTokenAsync(token);
                if (channel != null)
                {
                    User owner = await _userCrud.GetAsync(channel.OwnerId);
                    return new ChannelInfoViewModel(ChannelsStatus.Success, await GetChannelViewModelAsync(channel),
                            await GetOwnerViewModelAsync(owner), channel.OwnerId == user.Id,
                            await _channelsUsersCrud.AnyAsync(uc => uc.UserId == user.Id && uc.ChannelId == channel.Id));
                }
                return new ChannelInfoViewModel(ChannelsStatus.ChannelNotFound, null, null, false, false);

            }
            return new ChannelInfoViewModel(ChannelsStatus.UserNotFound, null, null, false, false);
        });

    public async Task<Channel> GetChannelByTokenAsync(string token)
        => await Task.FromResult(await _channelCrud.FirstOrDefaultAsync(c => c.Token == token));

    public async Task<GetPostResponse> GetChannelPostsAsync(string token, int index)
        => await Task.Run(async () =>
        {
            Channel channel = await GetChannelByTokenAsync(token);
            if (channel != null)
            {
                IEnumerable<Post> posts = await _post.GetChannelPostsAsync(channel.Id, index);
                IEnumerable<PostViewModel> postsViewModel = await _post.CreatePostViewModelAsync(posts);
                return new GetPostResponse(PostStaus.Success, postsViewModel);
            }
            return new GetPostResponse(PostStaus.ChannelNotFound, null);
        });

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
                IEnumerable<Channel> channels = userChannels.Select((uc) => _channelCrud.GetAsync(uc.ChannelId).Result);
                IEnumerable<ChannelPreviewViewModel> channelsViewModel = await GetChannelPreviewViewModelAsync(channels);
                return new GetChannelsResponse(ChannelsStatus.Success, channelsViewModel);
            }
            return new GetChannelsResponse(ChannelsStatus.UserNotFound, null);
        });

    public async Task<ChannelViewModel> GetChannelViewModelAsync(Channel channel)
        => await Task.Run(async () =>
        {
            ChannelViewModel channelViewModel = new(
                Token: channel.Token,
                Link: channel.Link,
                Name: channel.Name,
                Avatar: await _fileCrud.GetAsync(cf => cf.ObjectId == channel.Id)
                );
            return channelViewModel;
        });

    public async Task<IEnumerable<ChannelViewModel>> GetChannelViewModelAsync(IEnumerable<Channel> channels)
        => await Task.FromResult(channels.Select(channel => GetChannelViewModelAsync(channel).Result));

    public async Task<OwnerViewModel> GetOwnerViewModelAsync(User user)
        => await Task.Run(async () => new OwnerViewModel(
           Email: user.Email,
           Token: "",
           UserName: user.UserName,
           Avatar: await _fileCrud.GetAsync(uf => uf.ObjectId == user.Id)));

    public async Task<IEnumerable<Channel>> SearchAsync(string q)
        => await Task.FromResult(await
                _channelCrud.GetAsync(c =>
                        c.Link.Contains(q) || c.Name.Contains(q)));

    public async Task<SendPostResponse> SendPostAsync(SendPostViewModel sendPost, IHeaderDictionary headers)
        => await Task.Run(async () =>
        {
            User user = await _account.GetUserBySessionAsync(headers);
            if (user != null)
            {
                Channel channel = await GetChannelByTokenAsync(sendPost.Token);
                if (channel != null)
                {
                    if (await _channelsAdminsCrud.AnyAsync(ca => ca.UserId == user.Id && ca.ChannelId == channel.Id) || channel.OwnerId == user.Id)
                    {
                        var post = await _post.CreatePostAsync(sendPost, channel.Id, PostOwner.Channel);
                        return new SendPostResponse(PostStaus.Success, post);
                    }
                    return new SendPostResponse(PostStaus.AccessDenied, null);
                }
                return new SendPostResponse(PostStaus.ChannelNotFound, null);
            }
            return new SendPostResponse(PostStaus.UserNotFound, null);
        });

    public async Task<ChannelsStatus> SubscribeChannelAsync(string token, IHeaderDictionary headers)
        => await Task.Run(async () =>
        {
            User user = await _account.GetUserBySessionAsync(headers);
            Channel channel = await GetChannelByTokenAsync(token);
            return await SubscribeChannelAsync(channel, user);
        });

    public async Task<ChannelsStatus> SubscribeChannelAsync(string token, User user)
        => await Task.FromResult(await SubscribeChannelAsync(await GetChannelByTokenAsync(token), user));

    public async Task<ChannelsStatus> SubscribeChannelAsync(Channel channel, User user)
        => await Task.Run(async () =>
        {
            if (user == null)
                return ChannelsStatus.UserNotFound;
            if (channel == null)
                return ChannelsStatus.ChannelNotFound;

            ChannelsUsers join = new()
            {
                ChannelId = channel.Id,
                UserId = user.Id
            };
            return await _channelsUsersCrud.InsertAsync(join) ?
                    ChannelsStatus.Success : ChannelsStatus.Exception;
        });
}
