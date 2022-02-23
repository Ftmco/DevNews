using Entity.Article;

namespace Service.Rules;

public interface IFileRules : IDisposable
{
    Task<TFile> SaveFileAsync();
}
