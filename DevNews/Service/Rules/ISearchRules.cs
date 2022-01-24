using ViewModel.Search;

namespace Service.Rules;

public interface ISearchRules : IDisposable
{
    Task<SearchResponse> SearchAsync(string q);
}
