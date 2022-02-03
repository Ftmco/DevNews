using Entity.Article;

namespace Service.Rules;

public interface ICategoryRules : IDisposable
{
    Task<GetCategoriesResponse> GetCategoriesAsync();

    Task<CategoryViewModel> CreateCategoryViewModelAsync(Category category);

    Task<IEnumerable<CategoryViewModel>> CreateCategoryViewModelAsync(IEnumerable<Category> categories);
    Task<IEnumerable<Category>> SearchAsync(string q);
}
