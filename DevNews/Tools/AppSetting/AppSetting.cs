using Newtonsoft.Json.Linq;
using static System.IO.File;

namespace Tools.AppSetting;

public static class AppSetting
{
    public static async Task<string> GetDataAsync(this string obj, string key)
        => await Task.Run(async () =>
        {
            string? file = await ReadAllTextAsync(Directory.GetCurrentDirectory() + "/appsettings.json");
            JObject? json = JObject.Parse(file);
            return json[obj][key].ToString();
        });
}