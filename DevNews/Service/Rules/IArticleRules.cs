using Entity.Article;
using Microsoft.AspNetCore.Http;
using ViewModel.Article;
using ViewModel.File;

namespace Service.Rules;

public interface IArticleRules : IDisposable
{
    Task<UpsertArticleResponse> CreateAsync(UpsertArticleViewModel create);

    Task<UpsertArticleResponse> UpdateAsync(UpsertArticleViewModel update);

    Task<UpsertArticleResponse> UpsertAsync(UpsertArticleViewModel upsert);

    Task<IEnumerable<ArticleViewModel>> CreateArticleViewModelAsync(IEnumerable<Article> articles);

    Task<ArticleViewModel> CreateArticleViewModelAsync(Article article);

    Task<bool> SaveArticleFileAsync(UploadFileViewModel uploadFile,Guid articleId);

    Task<UpsertArticleResponse> UpsertAsync(ApiRequest request, HttpContext httpContext);
}
