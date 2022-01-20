using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Rules;
using ViewModel.Channel;

namespace Article.Web.Server.V2.Controllers.Client;

[Route("api/[controller]")]
[ApiController]
public class ChannelController : ControllerBase
{
    private readonly IChannelRules _channel;

    public ChannelController(IChannelRules channel)
    {
        _channel = channel;
    }

    [HttpGet("Get")]
    public async Task<IActionResult> Get()
    {
        GetChannelsResponse? channels = await _channel.GetChannelsAsync(HttpContext);
        return channels.Status switch
        {
            GetChannelsStatus.Success => Ok(Success("", "User Channels", channels.Channels)),
            GetChannelsStatus.UserNotFound => Ok(Faild(403, "User Not Found", "Please Login To Your Account")),
            GetChannelsStatus.Exception => Ok(ApiException("Exception", "")),
            _ => Ok(ApiException("Exception", "")),
        };
    }
}
