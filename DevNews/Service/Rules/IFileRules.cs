using Entity.Article;

namespace Service.Rules;

public interface IFileRules : IDisposable
{
    Task<TFile> SaveFileAsync(UploadFileViewModel saveFile,string dir,Guid objectId,short objectType);

    Task<bool> DeleteFileAsync(Guid id);

    Task<bool> DeleteFileAsync(string name);

    Task<bool> DeleteFileAsync(TFile file);
}
