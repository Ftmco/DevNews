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

    [HttpGet("Search")]
    public async Task<IActionResult> Search(string q)
        => Ok(Success("", "Search Items Result", await _search.SearchAsync(q)));

    [HttpGet("Explore")]
    public async Task<IActionResult> Explore()
        => Ok(Success("", "Explore Items", await _search.ExploreAsync(Request.Headers)));

    [HttpGet("SearchEnc")]
    public async Task<IActionResult> SearchEnc(string q)
        => Ok(await Success("", "Search Items Result", await _search.SearchAsync(q)).SendResponseAsync(HttpContext));

    [HttpGet("ExploreEnc")]
    public async Task<IActionResult> ExploreEnc()
        => Ok(await Success("", "Explore Items", await _search.ExploreAsync(Request.Headers)).SendResponseAsync(HttpContext));
}
