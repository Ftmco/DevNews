using Microsoft.AspNetCore.Http;
using ViewModel.Channel;

namespace Service.Rules;

public interface IChannelRules : IDisposable
{
    Task<GetChannelsResponse> GetChannelsAsync(HttpContext httpContext);
}
