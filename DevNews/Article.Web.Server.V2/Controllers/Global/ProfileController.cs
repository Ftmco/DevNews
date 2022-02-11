using ViewModel.Profile;

namespace Article.Web.Server.V2.Controllers.Global;

[Route("api/[controller]")]
[ApiController]
public class ProfileController : ControllerBase
{
    private readonly IProfileRules _profile;

    public ProfileController(IProfileRules profile)
    {
        _profile = profile;
    }

    [HttpGet("Get")]
    public async Task<IActionResult> Get()
    {
        ProfileResponse? profile = await _profile.GetProfileAsync(Request.Headers);
        return profile.Status switch
        {
            ProfileStatus.Success => Ok(Success("", "User Profile", profile.Profile)),
            ProfileStatus.UserNotFound => Ok(Faild(403, "User Not Found", "Please Login To Your Account")),
            ProfileStatus.Exception => Ok(ApiException("Exception", "")),
            _ => Ok(ApiException("Exception", "")),
        };
    }

    [HttpPost("Update")]
    public async Task<IActionResult> Update(UpdateProfileViewModel profile)
    {
        ProfileResponse? update = await _profile.UpdateProfileAsync(profile, Request.Headers);
        return update.Status switch
        {
            ProfileStatus.Success => Ok(Success("Update Profile Successfully", "", update.Profile)),
            ProfileStatus.UserNotFound => Ok(Faild(403, "User Not Found", "Please Login To Your Account")),
            ProfileStatus.Exception => Ok(ApiException("Exception", "")),
            ProfileStatus.UserNameExist => Ok(Faild(403, "User Name Exist", "")),
            _ => Ok(ApiException("Exception", "")),
        };
    }

    [HttpGet("GetEnc")]
    public async Task<IActionResult> GetEnc()
    {
        ProfileResponse? profile = await _profile.GetProfileAsync(Request.Headers);
        return profile.Status switch
        {
            ProfileStatus.Success => Ok(await Success("", "User Profile", profile.Profile).SendResponseAsync(HttpContext)),
            ProfileStatus.UserNotFound => Ok(await Faild(403, "User Not Found", "Please Login To Your Account").SendResponseAsync(HttpContext)),
            ProfileStatus.Exception => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
        };
    }

    [HttpPost("UpdateEnc")]
    public async Task<IActionResult> Update(ApiRequest request)
    {
        ProfileResponse? update = await _profile.UpdateProfileAsync(request, HttpContext);
        return update.Status switch
        {
            ProfileStatus.Success => Ok(await Success("Update Profile Successfully", "", update.Profile).SendResponseAsync(HttpContext)),
            ProfileStatus.UserNotFound => Ok(await Faild(403, "User Not Found", "Please Login To Your Account").SendResponseAsync(HttpContext)),
            ProfileStatus.Exception => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
            ProfileStatus.UserNameExist => Ok(await Faild(403, "User Name Exist", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception", "").SendResponseAsync(HttpContext)),
        };
    }
}
