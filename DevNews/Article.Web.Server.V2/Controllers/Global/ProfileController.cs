using Microsoft.AspNetCore.Mvc;
using Service.Rules;
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
        GetProileResponse? profile = await _profile.GetProfileAsync(Request.Headers);
        return profile.Status switch
        {
            ProfileStatus.Success => Ok(Success("", "User Profile", profile.Profile)),
            ProfileStatus.UserNotFound => Ok(Faild(403, "User Not Found", "Please Login To Your Account")),
            ProfileStatus.Exception => Ok(ApiException("Exception", "")),
            _ => Ok(ApiException("Exception", "")),
        };
    }
}
