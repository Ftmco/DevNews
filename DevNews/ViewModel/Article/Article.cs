using ViewModel.Category;
using ViewModel.File;

namespace ViewModel.Article;

public record UpsertArticleViewModel(Guid? Id, string Title, string Text, string ShortDescription,
                UploadFileViewModel Image, IEnumerable<UploadFileViewModel> AttechmentFiles,
                IEnumerable<Guid> Categories, string Tags, ArticleOwner Owner, string OwnerToken, bool IsActive);

public record ArticleViewModel(Guid Id, string Title, string ShortDescription, string Text, string Tags, object Owner, IEnumerable<CategoryViewModel> Categories);

public record UpsertArticleResponse(UpsertArticleStatus Status, ArticleViewModel Article);

public enum ArticleOwner
{
    Channel = 0,
    Page = 1
}

public enum UpsertArticleStatus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2,
    OwnerNotFound = 3
}