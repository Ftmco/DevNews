using Entity.Article;
using Entity.Channel;
using Microsoft.AspNetCore.Http;
using Service.Rules;
using ViewModel.Search;

namespace Service.Service;

public class SearchServices : ISearchRules
{
    private readonly IChannelRules _channel;

    private readonly ICategoryRules _category;


    public SearchServices(IChannelRules channel, ICategoryRules category)
    {
        _channel = channel;
        _category = category;
    }

    public async Task<IEnumerable<string>> AutoCompleteAsync(string q)
        => await Task.Run(async () =>
        {
            IEnumerable<string> channels = await _channel.SearchStringAsync(q);
            return channels;

        });

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public Task<object> ExploreAsync(IHeaderDictionary headers)
    {
        throw new NotImplementedException();
    }

    public Task<object> ExploreAsync(HttpContext httpContext)
    {
        throw new NotImplementedException();
    }

    public async Task<SearchResponse> SearchAsync(string q)
        => await Task.Run(async () =>
        {
            IEnumerable<Channel> channels = await _channel.SearchAsync(q);
            IEnumerable<Category> categories = await _category.SearchAsync(q);
            IEnumerable<ChannelPreviewViewModel> channelsViewModel = await _channel.GetChannelPreviewViewModelAsync(channels);
            IEnumerable<CategoryViewModel> categoriesViewModel = await _category.CreateCategoryViewModelAsync(categories);

            return new SearchResponse(channelsViewModel, categoriesViewModel);
        });

    public Task<object> SearchAsync(string q, HttpContext httpContext)
    {
        throw new NotImplementedException();
    }
}
