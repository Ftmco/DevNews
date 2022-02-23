using Entity.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Article.Web.Server.V2.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ApplicationController : ControllerBase
{
    readonly IApplicationRules _application;

    public ApplicationController(IApplicationRules application)
    {
        _application = application;
    }

    [HttpGet("GetLanguages")]
    public async Task<IActionResult> GetLanguages()
    {
        IEnumerable<Language>? languages = await _application.GetLanguagesAsync();
        return Ok(Success("", "", languages));
    }
}

