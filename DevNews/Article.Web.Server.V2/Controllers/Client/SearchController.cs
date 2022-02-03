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

    [HttpGet("AutoComplete")]
    public async Task<IActionResult> AutoComplete(string q)
        => Ok(Success("", $"Auto Complete Items With {q}", await _search.AutoCompleteAsync(q)));
}
