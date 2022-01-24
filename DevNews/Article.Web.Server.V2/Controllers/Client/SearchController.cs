using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Article.Web.Server.V2.Controllers.Client;

[Route("api/[controller]")]
[ApiController]
public class SearchController : ControllerBase
{

  private readonly ISearchRules _search;
  
  public SearchController(ISearchRules search){
   _search = search;
  }

  public async Task<IActionResult> Search(string q)
        => Ok(Success("","Search Items Result",await _search.SearchAsync(q)));
}
