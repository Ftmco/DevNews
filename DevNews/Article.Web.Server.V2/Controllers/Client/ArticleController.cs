using ViewModel.Article;

namespace Article.Web.Server.V2.Controllers.Client;

[Route("api/[controller]")]
[ApiController]
public class ArticleController : ControllerBase
{
    private readonly IArticleRules _article;

    public ArticleController(IArticleRules article)
    {
        _article = article;
    }

    [HttpPost("UpsertArticle")]
    public async Task<IActionResult> UpsertArticle(UpsertArticleViewModel upsert)
    {
        UpsertArticleResponse? upsertArticle = await _article.UpsertAsync(upsert);
        return upsertArticle.Status switch
        {
            UpsertArticleStatus.Success => Ok(Success("Article Created Successfully", "", upsertArticle.Article)),
            UpsertArticleStatus.UserNotFound => Ok(Faild(403, "Please Login To your account", "")),
            UpsertArticleStatus.Exception => Ok(ApiException("Please Try Again", "")),
            UpsertArticleStatus.OwnerNotFound => Ok(Faild(404, "Owner Not Found...", "")),
            _ => Ok(ApiException("Please Try Again", "")),
        };
    }

    [HttpPost("UpsertArticleEnc")]
    public async Task<IActionResult> UpsertArticle(ApiRequest request)
    {
        UpsertArticleResponse? upsertArticle = await _article.UpsertAsync(request,HttpContext);
        return upsertArticle.Status switch
        {
            UpsertArticleStatus.Success => Ok(Success("Article Created Successfully", "", upsertArticle.Article)),
            UpsertArticleStatus.UserNotFound => Ok(Faild(403, "Please Login To your account", "")),
            UpsertArticleStatus.Exception => Ok(ApiException("Please Try Again", "")),
            UpsertArticleStatus.OwnerNotFound => Ok(Faild(404, "Owner Not Found...", "")),
            _ => Ok(ApiException("Please Try Again", "")),
        };
    }
}
