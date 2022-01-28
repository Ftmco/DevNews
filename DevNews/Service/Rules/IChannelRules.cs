using Entity.Article;
using Entity.Channel;
using Entity.User;
using Microsoft.AspNetCore.Http;
using ViewModel.Channel;

namespace Service.Rules;

public interface IChannelRules : IDisposable
{
    Task<GetChannelsResponse> GetChannelsAsync(HttpContext httpContext);

    Task<ChannelPreviewViewModel> GetChannelPreviewViewModelAsync(Channel channel);

    Task<ChannelViewModel> GetChannelViewModelAsync(Channel channel);

    Task<IEnumerable<ChannelViewModel>> GetChannelViewModelAsync(IEnumerable<Channel> channels);

    Task<IEnumerable<ChannelPreviewViewModel>> GetChannelPreviewViewModelAsync(IEnumerable<Channel> channel);

    Task<UpsertChannelResponse> CreateAsync(UpsertChannelViewModel insert, IHeaderDictionary headers);

    Task<bool> CheckLinkAsync(string link);

    Task<GetChannelsResponse> GetAdminChannelsAsync(HttpContext httpContext);

    Task<ChannelsStatus> SubscribeChannelAsync(string token, IHeaderDictionary headers);

    Task<ChannelsStatus> SubscribeChannelAsync(string token, User user);

    Task<ChannelsStatus> SubscribeChannelAsync(Channel channel, User user);

    Task<Channel> GetChannelByTokenAsync(string token);

    Task<ChannelInfoViewModel> GetChannelAsync(string token, IHeaderDictionary headers);

    Task<OwnerViewModel> GetOwnerViewModelAsync(User user);

    Task<IEnumerable<Channel>> SearchAsync(string q);

    Task<IEnumerable<string>> SearchStringAsync(string q);

    Task<GetPostResponse> GetChannelPostsAsync(string token,int index);

    Task<SendPostResponse> SendPostAsync(SendPostViewModel sendPost, IHeaderDictionary headers);
}
