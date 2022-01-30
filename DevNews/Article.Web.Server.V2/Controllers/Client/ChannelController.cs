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

    [HttpGet("AdminChannels")]
    public async Task<IActionResult> GetAdminChannels()
    {
        GetChannelsResponse? channels = await _channel.GetAdminChannelsAsync(HttpContext);
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

    [HttpGet("Subscribe")]
    public async Task<IActionResult> Subscribe(string token)
        => await _channel.SubscribeChannelAsync(token, Request.Headers) switch
        {
            ChannelsStatus.Success => Ok(Success("", "Join Channel Successfully", new { })),
            ChannelsStatus.UserNotFound => Ok(Faild(403, "User Not Found Please Login to your Account", "")),
            ChannelsStatus.Exception => Ok(ApiException("Exception,Please Try Again", "")),
            ChannelsStatus.ChannelNotFound => Ok(Faild(404, "Channel Is Not Defined", "")),
            _ => Ok(ApiException("Exception,Please Try Again", "")),
        };

    [HttpGet("Channel")]
    public async Task<IActionResult> Channel(string token)
    {
        ChannelInfoViewModel? channel = await _channel.GetChannelAsync(token, Request.Headers);
        return channel.Status switch
        {
            ChannelsStatus.Success => Ok(Success("", $"Channel '{channel.Channel.Name}' Info", channel)),
            ChannelsStatus.UserNotFound => Ok(Faild(403, "User Not Found Please Login to your Account", "")),
            ChannelsStatus.Exception => Ok(ApiException("Exception,Please Try Again", "")),
            _ => Ok(ApiException("Exception,Please Try Again", "")),
        };
    }

    [HttpGet("Posts")]
    public async Task<IActionResult> Posts(string token, int index)
    {
        GetPostResponse? posts = await _channel.GetChannelPostsAsync(token, index);
        return posts.Staus switch
        {
            PostStaus.Success => Ok(Success("", "Channel Posts", posts.Posts)),
            PostStaus.UserNotFound => Ok(Faild(403, "User Not Found Plase Login To Your Account", "")),
            PostStaus.Exception => Ok(ApiException("Exception,Please Try Again", "")),
            PostStaus.ChannelNotFound => Ok(Faild(404, "Channel Not Found", "")),
            _ => Ok(ApiException("Exception,Please Try Again", "")),
        };
    }

    [HttpGet("Articles")]
    public async Task<IActionResult> Articles(string token)
    {
        return Ok();
    }

    [HttpPost("SendPost")]
    public async Task<IActionResult> SendPost(SendPostViewModel sendPost)
    {
        SendPostResponse? post = await _channel.SendPostAsync(sendPost, Request.Headers);
        return post.Staus switch
        {
            PostStaus.Success => Ok(Success("", "Posted Successfully", post.Post)),
            PostStaus.UserNotFound => Ok(Faild(403, "User Not Found Plase Login To Your Account", "")),
            PostStaus.Exception => Ok(ApiException("Exception,Please Try Again", "")),
            PostStaus.ChannelNotFound => Ok(Faild(404, "Channel Not Found", "")),
            _ => Ok(ApiException("Exception,Please Try Again", "")),
        };
    }
}
