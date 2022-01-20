using Entity.Channel;
using Microsoft.AspNetCore.Http;
using ViewModel.Channel;

namespace Service.Rules;

public interface IChannelRules : IDisposable
{
    Task<GetChannelsResponse> GetChannelsAsync(HttpContext httpContext);

    Task<ChannelPreviewViewModel> GetChannelPreviewViewModelAsync(Channel channel);

    Task<IEnumerable<ChannelPreviewViewModel>> GetChannelPreviewViewModelAsync(IEnumerable<Channel> channel);

    Task<UpsertChannelResponse> CreateAsync(UpsertChannelViewModel insert,IHeaderDictionary headers);

    Task<bool> CheckLinkAsync(string link);
}
