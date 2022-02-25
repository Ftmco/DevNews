using ViewModel.File;
using static Tools.AppSetting.AppSetting;

namespace Tools.FileTools;

public static class FileExtensions
{
    public static async Task<string> CreateFileAddressAsync(this string fileName, string path)
        => await Task.Run(async () =>
        {
            string? url = await "Urls".GetDataAsync("Base");
            return $"{url}/{path}/{fileName ?? "null.png"}";
        });

    public static async Task<SaveFileResponse> SaveFileAsync(this SaveFileViewModel saveFile)
        => await Task.Run(async () =>
        {
            try
            {
                string[]? splitBase64 = saveFile.Base64.Split(',');
                string base64 = splitBase64[1];
                string type = splitBase64[0].Split(';')[0].Split(':')[1];
                string extension = type.Split('/')[1];
                string fileName = $"{Guid.NewGuid()}.{extension}";
                byte[]? fileBytes = Convert.FromBase64String(base64);
                string path = $"wwwroot/{saveFile.Path}";
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
                await File.WriteAllBytesAsync($"{path}/{fileName}", fileBytes);
                return new SaveFileResponse(SaveFileStatus.Success, fileName, type, fileBytes.Length);
            }
            catch
            {
                return new SaveFileResponse(SaveFileStatus.Exception, "", "", 0);
            }
        });

    public static async Task<bool> DeleteFileAsync(this string path)
        => await Task.Run(() =>
        {
            try
            {
                File.Delete(path);
                return true;
            }
            catch
            {
                return false;
            }
        });
}