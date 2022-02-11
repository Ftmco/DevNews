using ViewModel.Category;

namespace Article.Web.Server.V2.Controllers.Client;

[Route("api/[controller]")]
[ApiController]
public class GroupController : ControllerBase
{
    private readonly ICategoryRules _category;

    public GroupController(ICategoryRules category)
    {
        _category = category;
    }

    [HttpGet("Get")]
    public async Task<IActionResult> Get()
    {
        GetCategoriesResponse? categories = await _category.GetCategoriesAsync();
        return categories.Status switch
        {
            CategoryStatus.Success => Ok(Success("", "Categories", categories.Categories)),
            CategoryStatus.Exception => Ok(ApiException("Exception", "")),
            _ => Ok(ApiException("Exception", "")),
        };
    }

    [HttpGet("GetEnc")]
    public async Task<IActionResult> GetEnc()
    {
        GetCategoriesResponse? categories = await _category.GetCategoriesAsync(HttpContext);
        return categories.Status switch
        {
            CategoryStatus.Success => Ok(Success("", "Categories", categories.Categories)),
            CategoryStatus.Exception => Ok(ApiException("Exception", "")),
            _ => Ok(ApiException("Exception", "")),
        };
    }
}
