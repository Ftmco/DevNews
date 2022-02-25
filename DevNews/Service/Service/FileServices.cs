using Entity.Article;
using Service.Rules;
using Tools.FileTools;

namespace Service.Service;

public class FileServices : IFileRules
{
    readonly IBaseRules<TFile> _fileBase;

    public FileServices(IBaseRules<TFile> fileBase)
    {
        _fileBase = fileBase;
    }

    public async Task<bool> DeleteFileAsync(Guid id)
        => await Task.Run(async () =>
        {
            TFile file = await _fileBase.GetAsync(id);
            return file != null && await DeleteFileAsync(file);
        });

    public async Task<bool> DeleteFileAsync(string name)
        => await Task.Run(async () =>
        {
            TFile file = await _fileBase.FirstOrDefaultAsync(f => f.Name.ToLower() == name.ToLower());
            return file != null && await DeleteFileAsync(file.Id);
        });

    public async Task<bool> DeleteFileAsync(TFile file)
        => await Task.Run(async () =>
        {
            string fileAddress = $"{file.Directory}/{file.Name}";
            return await fileAddress.DeleteFileAsync();
        });

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<TFile> SaveFileAsync(UploadFileViewModel saveFile, string dir, Guid objectId, short objectType)
        => await Task.Run(async () =>
        {
            SaveFileResponse file = await new SaveFileViewModel(saveFile.Base64, dir).SaveFileAsync();
            if (file.Status == SaveFileStatus.Success)
            {
                TFile newFile = new()
                {
                    CreateDate = DateTime.Now,
                    Directory = dir,
                    Name = file.Name,
                    ObjectId = objectId,
                    ObjectType = objectType,
                    OrginalName = saveFile.OgName,
                    Type = file.Type,
                    Size = file.Size
                };
                return await _fileBase.InsertAsync(newFile) ? newFile : null;
            }
            return null;
        });
}
