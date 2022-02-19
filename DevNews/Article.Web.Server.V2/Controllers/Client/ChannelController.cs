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

    [HttpGet("GetEnc")]
    public async Task<IActionResult> GetEnc()
    {
        GetChannelsResponse? channels = await _channel.GetChannelsAsync(HttpContext);
        return channels.Status switch
        {
            ChannelsStatus.Success => Ok(await Success("", "User Channels", channels.Channels).SendResponseAsync(HttpContext)),
            ChannelsStatus.UserNotFound => Ok(await Faild(403, "User Not Found", "Please Login To Your Account").SendResponseAsync(HttpContext)),
            ChannelsStatus.Exception => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
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

    [HttpGet("AdminChannelsEnc")]
    public async Task<IActionResult> AdminChannelsEnc()
    {
        GetChannelsResponse? channels = await _channel.GetAdminChannelsAsync(HttpContext);
        return channels.Status switch
        {
            ChannelsStatus.Success => Ok(await Success("", "User Channels", channels.Channels).SendResponseAsync(HttpContext)),
            ChannelsStatus.UserNotFound => Ok(await Faild(403, "User Not Found", "Please Login To Your Account").SendResponseAsync(HttpContext)),
            ChannelsStatus.Exception => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
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

    [HttpPost("CreateEnc")]
    public async Task<IActionResult> Create(ApiRequest request)
    {
        UpsertChannelResponse? create = await _channel.CreateAsync(request, HttpContext);
        return create.Status switch
        {
            ChannelsStatus.Success => Ok(await Success("Channel Created Successfully", "", create.Channel).SendResponseAsync(HttpContext)),
            ChannelsStatus.UserNotFound => Ok(await Faild(403, "User Not Found", "Please Login To Your Account").SendResponseAsync(HttpContext)),
            ChannelsStatus.Exception => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
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

    [HttpGet("ChannelEnc")]
    public async Task<IActionResult> ChannelEnc(string token)
    {
        ChannelInfoViewModel? channel = await _channel.GetChannelAsync(token, Request.Headers);
        return channel.Status switch
        {
            ChannelsStatus.Success => Ok(await Success("", $"Channel '{channel.Channel.Name}' Info", channel).SendResponseAsync(HttpContext)),
            ChannelsStatus.UserNotFound => Ok(await Faild(403, "User Not Found Please Login to your Account", "").SendResponseAsync(HttpContext)),
            ChannelsStatus.Exception => Ok(await ApiException("Exception,Please Try Again", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception,Please Try Again", "").SendResponseAsync(HttpContext)),
        };
    }

    [HttpGet("Posts")]
    public async Task<IActionResult> Posts(string token, int index)
    {
        GetPostResponse? posts = await _channel.GetChannelPostsAsync(token, index);
        return posts.Staus switch
        {
            PostStaus.Success => Ok(Success("", "Channel Posts", new { posts.Posts, posts.TotalCount })),
            PostStaus.UserNotFound => Ok(Faild(403, "User Not Found Plase Login To Your Account", "")),
            PostStaus.Exception => Ok(ApiException("Exception,Please Try Again", "")),
            PostStaus.ChannelNotFound => Ok(Faild(404, "Channel Not Found", "")),
            _ => Ok(ApiException("Exception,Please Try Again", "")),
        };
    }

    [HttpGet("PostsEnc")]
    public async Task<IActionResult> PostsEnc(string token, int index)
    {
        GetPostResponse? posts = await _channel.GetChannelPostsAsync(token, index);
        return posts.Staus switch
        {
            PostStaus.Success => Ok(await Success("", "Channel Posts", new { posts.Posts, posts.TotalCount }).SendResponseAsync(HttpContext)),
            PostStaus.UserNotFound => Ok(await Faild(403, "User Not Found Plase Login To Your Account", "").SendResponseAsync(HttpContext)),
            PostStaus.Exception => Ok(await ApiException("Exception,Please Try Again", "").SendResponseAsync(HttpContext)),
            PostStaus.ChannelNotFound => Ok(await Faild(404, "Channel Not Found", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception,Please Try Again", "").SendResponseAsync(HttpContext)),
        };
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

    [HttpPost("SendPostEnc")]
    public async Task<IActionResult> SendPost(ApiRequest request)
    {
        SendPostResponse? post = await _channel.SendPostAsync(request, HttpContext);
        return post.Staus switch
        {
            PostStaus.Success => Ok(await Success("", "Posted Successfully", post.Post).SendResponseAsync(HttpContext)),
            PostStaus.UserNotFound => Ok(await Faild(403, "User Not Found Plase Login To Your Account", "").SendResponseAsync(HttpContext)),
            PostStaus.Exception => Ok(await ApiException("Exception,Please Try Again", "").SendResponseAsync(HttpContext)),
            PostStaus.ChannelNotFound => Ok(await Faild(404, "Channel Not Found", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception,Please Try Again", "").SendResponseAsync(HttpContext)),
        };
    }
}
