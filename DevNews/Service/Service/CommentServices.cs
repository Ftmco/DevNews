using Entity.Comment;
using Service.Rules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service;

public class CommentServices : ICommentRules
{
    readonly IBaseRules<Comment> _commentCrud;

    public CommentServices(IBaseRules<Comment> commentCrud)
    {
        _commentCrud = commentCrud;
    }

    public Task CreateCommentAsync()
    {
        throw new NotImplementedException();
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }
}
