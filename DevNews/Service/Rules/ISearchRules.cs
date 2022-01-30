using ViewModel.Search;

namespace Service.Rules;

public interface ISearchRules : IDisposable
{
    Task<SearchResponse> SearchAsync(string q);

    Task<IEnumerable<string>> AutoCompleteAsync(string q);
}
