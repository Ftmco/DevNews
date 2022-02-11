using Entity.Article;
using Microsoft.AspNetCore.Http;
using Service.Rules;
using Tools.AppSetting;
using Tools.FileTools;
using ViewModel.Article;
using ViewModel.File;

namespace Service.Service;

public class ArticleServices : IArticleRules
{
    private readonly ICategoryRules _category;

    private readonly IBaseRules<Category> _categoryCrud;

    private readonly IBaseRules<ArticleCategories> _articleCategoriesCrud;

    private readonly IBaseRules<Article> _articleCrud;

    private readonly IBaseRules<Entity.Article.File> _fileCrud;

    private readonly IChannelRules _channel;

    private readonly IPageRules _page;

    public ArticleServices(ICategoryRules category, IBaseRules<Category> categoryCrud, IBaseRules<ArticleCategories> articleCategoriesCrud,
            IBaseRules<Article> articleCrud, IChannelRules channel, IPageRules page, IBaseRules<Entity.Article.File> fileCrud)
    {
        _category = category;
        _categoryCrud = categoryCrud;
        _articleCategoriesCrud = articleCategoriesCrud;
        _articleCrud = articleCrud;
        _channel = channel;
        _page = page;
        _fileCrud = fileCrud;
    }

    public async Task<IEnumerable<ArticleViewModel>> CreateArticleViewModelAsync(IEnumerable<Article> articles)
        => await Task.FromResult(articles.Select(a => CreateArticleViewModelAsync(a).Result));

    public async Task<ArticleViewModel> CreateArticleViewModelAsync(Article article)
        => await Task.Run(async () =>
        {
            IEnumerable<ArticleCategories> articleCategories = await _articleCategoriesCrud.GetAsync(ac => ac.ArticleId == article.Id);
            IEnumerable<CategoryViewModel> categories =
            articleCategories.Select(ac =>
            {
                Category category = _categoryCrud.GetAsync(ac.CategoryId).Result;
                return _category.CreateCategoryViewModelAsync(category).Result;
            });

            ArticleViewModel articleViewModel = new(
                Id: article.Id, Title: article.Title, ShortDescription: article.ShortDescription,
                Text: article.Text, Tags: article.Tags,
                Owner: new { },
                Categories: categories);
            return articleViewModel;
        });

    public async Task<UpsertArticleResponse> CreateAsync(UpsertArticleViewModel create)
        => await Task.Run(async () =>
        {
            dynamic owner = create.Owner switch
            {
                ArticleOwner.Channel => await _channel.GetChannelByTokenAsync(create.OwnerToken),
                ArticleOwner.Page => await _page.GetPageByTokenAsync(create.OwnerToken),
                _ => await _channel.GetChannelByTokenAsync(create.OwnerToken),
            };

            if (owner == null)
                return new UpsertArticleResponse(UpsertArticleStatus.OwnerNotFound, default);

            Article newArticle = new()
            {
                OwnerType = (short)create.Owner,
                Title = create.Title,
                Text = create.Text,
                Tags = create.Tags,
                ShortDescription = create.ShortDescription,
                OwnerId = owner.Id,
            };

            if (await _articleCrud.InsertAsync(newArticle))
            {
                foreach (Guid category in create.Categories)
                    await _articleCategoriesCrud.InsertAsync(new ArticleCategories { ArticleId = newArticle.Id, CategoryId = category });

                await SaveArticleFileAsync(create.Image, newArticle.Id);

                foreach (var file in create.AttechmentFiles)
                    await SaveArticleFileAsync(file, newArticle.Id);

                return new UpsertArticleResponse(UpsertArticleStatus.Success, await CreateArticleViewModelAsync(newArticle));
            }
            return new UpsertArticleResponse(UpsertArticleStatus.Exception, default);
        });

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<bool> SaveArticleFileAsync(UploadFileViewModel uploadFile, Guid articleId)
        => await Task.Run(async () =>
        {
            try
            {
                string directory = await "Directories".GetDataAsync("Article");
                SaveFileResponse saveFile = await new SaveFileViewModel(uploadFile.Base64, directory).SaveFileAsync();
                Entity.Article.File articleFile = new()
                {
                    CreateDate = DateTime.Now,
                    Directory = directory,
                    ObjectId = articleId,
                    ObjectType = 0,
                    OrginalName = uploadFile.OgName,
                    Name = saveFile.Name,
                    Size = saveFile.Size,
                    Type = saveFile.Type
                };
                return await _fileCrud.InsertAsync(articleFile);
            }
            catch
            {
                return false;
            }
        });

    public Task<UpsertArticleResponse> UpdateAsync(UpsertArticleViewModel update)
    {
        throw new NotImplementedException();
    }

    public async Task<UpsertArticleResponse> UpsertAsync(ApiRequest request, HttpContext httpContext)
        => await Task.Run(async () =>
        {
            UpsertArticleViewModel upsert = await request.ReadRequestDataAsync<UpsertArticleViewModel>(httpContext);
            return await UpsertAsync(upsert);
        });

    public async Task<UpsertArticleResponse> UpsertAsync(UpsertArticleViewModel upsert)
        => await Task.Run(async () =>
        {
            return upsert.Id == null ?
                await CreateAsync(upsert) :
                       await UpdateAsync(upsert);
        });
}
