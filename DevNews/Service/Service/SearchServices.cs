using Entity.Article;
using Entity.Channel;
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

    public void Dispose()
    {
        GC.SuppressFinalize(this);
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
}
