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
}