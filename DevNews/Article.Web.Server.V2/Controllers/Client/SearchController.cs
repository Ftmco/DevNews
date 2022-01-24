using Microsoft.AspNetCore.Mvc;
using Service.Rules;

namespace Article.Web.Server.V2.Controllers.Client;

[Route("api/[controller]")]
[ApiController]
public class SearchController : ControllerBase
{
    private readonly ISearchRules _search;

    public SearchController(ISearchRules search)
    {
        _search = search;
    }

    [HttpGet("Get")]
    public async Task<IActionResult> Get(string q)
        => Ok(Success("", $"Search Result For {q}", await _search.SearchAsync(q)));
}
