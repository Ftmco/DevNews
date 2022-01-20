using Entity.Channel;
using Entity.User;
using Microsoft.AspNetCore.Http;
using Service.Extensions;
using Service.Rules;
using Services.Base;
using ViewModel.Channel;

namespace Service.Service;

public class ChannelServices : IChannelRules
{
    private readonly IBaseRules<Channel> _channelCrud;

    private readonly IBaseRules<ChannelsUsers> _channelsUsersCrud;

    private readonly IAccountRules _account;

    public ChannelServices(IBaseRules<Channel> channelCrud, IAccountRules account, IBaseRules<ChannelsUsers> channelsUsersCrud)
    {
        _channelCrud = channelCrud;
        _account = account;
        _channelsUsersCrud = channelsUsersCrud;
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<GetChannelsResponse> GetChannelsAsync(HttpContext httpContext)
        => await Task.Run(async () =>
        {
            User user = await _account.GetUserBySessionAsync(httpContext.Request.Headers);
            if (user != null)
            {
                IEnumerable<ChannelsUsers> userChannels = await _channelsUsersCrud.GetAsync(uc => uc.UserId == user.Id);
                IEnumerable<Channel> channels = userChannels.Select((uc) => _channelCrud.GetAsync(uc.ChannelId).Result);
                IEnumerable<ChannelPreviewViewModel> channelsViewModel = await channels.CreateChannelPreviewViewModelAsync();
                return new GetChannelsResponse(GetChannelsStatus.Success, channelsViewModel);
            }
            return new GetChannelsResponse(GetChannelsStatus.UserNotFound, null);
        });
}
