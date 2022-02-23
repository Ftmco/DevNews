// See https://aka.ms/new-console-template for more information

using DataLayer.Context;
using Entity.Article;
using Entity.Explore;
using Entity.User;
using Services.Base;

Console.WriteLine("Article Social Data Trainer Is Runing Now...");

IBaseRules<User> _userBase = new BaseServices<User>(new ArticleContext());
IBaseRules<Article> _articleBase = new BaseServices<Article>(new ArticleContext());
IBaseRules<ArticleCategories> _articleCategoriesBase = new BaseServices<ArticleCategories>(new ArticleContext());
IBaseRules<Category> _categoryBase = new BaseServices<Category>(new ArticleContext());
IBaseRules<VisitArticles> _visitArticlesBase = new BaseServices<VisitArticles>(new ArticleContext());
IBaseRules<Explore> _exploreBase = new BaseServices<Explore>(new ArticleContext());

IEnumerable<User> users = await _userBase.GetAsync();

while (true)
{
    foreach (User user in users)
    {
        IEnumerable<VisitArticles> visitArtilces = await _visitArticlesBase.GetAsync(va => va.UserId == user.Id);
        foreach (VisitArticles va in visitArtilces)
        {
            Article? article = await _articleBase.GetAsync(va.ArticleId);
            if (article != null)
            {
                IEnumerable<ArticleCategories> articleCategories = await _articleCategoriesBase.GetAsync(a => a.ArticleId == article.Id);
                foreach (ArticleCategories? category in articleCategories)
                {
                    IEnumerable<ArticleCategories> relatedArtilces = await _articleCategoriesBase.GetAsync(a => a.CategoryId == category.Id);
                    foreach (var ra in relatedArtilces)
                    {
                        Explore explore = new()
                        {
                            ArticleId = ra.ArticleId,
                            UserId = user.Id
                        };
                        if (!await _exploreBase.AnyAsync(e => e.ArticleId == explore.ArticleId && e.UserId == explore.UserId))
                        {
                            Console.WriteLine(explore.ToString());
                            await _exploreBase.InsertAsync(explore);
                        }
                    }
                }
            }
        }
    }
    Console.WriteLine($"Start Again : {DateTime.Now}");
}