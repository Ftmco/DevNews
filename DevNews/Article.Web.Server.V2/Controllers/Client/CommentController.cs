using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Article.Web.Server.V2.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CommentController : ControllerBase
{
    readonly ICommentRules _comment;

    public CommentController(ICommentRules comment)
    {
        _comment = comment;
    }

    [HttpGet("GetComments")]
    public async Task<IActionResult> GetComments(Guid objectId, int page, int count)
    {
        return Ok();
    }
}

