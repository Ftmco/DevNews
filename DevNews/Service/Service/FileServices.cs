using Entity.Article;
using Service.Rules;

namespace Service.Service;

public class FileServices : IFileRules
{
    readonly IBaseRules<TFile> _fileBase;

    public FileServices(IBaseRules<TFile> fileBase)
    {
        _fileBase = fileBase;
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<TFile> SaveFileAsync()
        => await Task.Run(() =>
        {
            return new TFile();
        });
}
