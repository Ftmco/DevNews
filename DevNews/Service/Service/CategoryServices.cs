using Entity.Article;
using Microsoft.AspNetCore.Http;
using Service.Rules;

namespace Service.Service;

public class CategoryServices : ICategoryRules
{
    private readonly IBaseRules<Category> _categoryCrud;

    public CategoryServices(IBaseRules<Category> categoryCrud)
    {
        _categoryCrud = categoryCrud;
    }

    public async Task<CategoryViewModel> CreateCategoryViewModelAsync(Category category)
        => await Task.Run(async () =>
        {
            if (category != null)
            {
                CategoryViewModel categoryViewModel = new(
               Id: category.Id,
               Name: category.Name,
               Title: category.Title,
               Parent: await CreateCategoryViewModelAsync(await _categoryCrud.GetAsync(category.ParrentId)));
                return categoryViewModel;
            }
            return default;
        });

    public async Task<IEnumerable<CategoryViewModel>> CreateCategoryViewModelAsync(IEnumerable<Category> categories)
        => await Task.FromResult(categories.Select((category) => CreateCategoryViewModelAsync(category).Result));

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<GetCategoriesResponse> GetCategoriesAsync()
        => await Task.Run(async () =>
        {
            try
            {
                IEnumerable<Category> categories = await _categoryCrud.GetAsync();
                IEnumerable<CategoryViewModel> categoriesViewModel = await CreateCategoryViewModelAsync(categories);
                return new GetCategoriesResponse(CategoryStatus.Success, categoriesViewModel);
            }
            catch
            {
                return new GetCategoriesResponse(CategoryStatus.Exception, null);
            }
        });

    public async Task<IEnumerable<Category>> SearchAsync(string q)
        => await Task.FromResult(await _categoryCrud.GetAsync(c =>
                c.Name.Contains(q) || c.Title.Contains(q)));
}
