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
            ChannelsStatus.Success => Ok(Success("", "User Channels", channels.Channels)),
            ChannelsStatus.UserNotFound => Ok(Faild(403, "User Not Found", "Please Login To Your Account")),
            ChannelsStatus.Exception => Ok(ApiException("Exception", "")),
            _ => Ok(ApiException("Exception", "")),
        };
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create(UpsertChannelViewModel insert)
    {
        UpsertChannelResponse? create = await _channel.CreateAsync(insert, Request.Headers);
        return create.Status switch
        {
            ChannelsStatus.Success => Ok(Success("Channel Created Successfully", "", create.Channel)),
            ChannelsStatus.UserNotFound => Ok(Faild(403, "User Not Found", "Please Login To Your Account")),
            ChannelsStatus.Exception => Ok(ApiException("Exception", "")),
            _ => Ok(ApiException("Exception", "")),
        };
    }

    [HttpGet("CheckLink")]
    public async Task<IActionResult> CheckLink(string link)
    {
        return await _channel.CheckLinkAsync(link) ?
             Ok(Success("Channel Link Is Exist Please Chose An Other Link", "", new { })) :
                Ok(Success("Use Can Use This Link", "", new { }));
    }
}
