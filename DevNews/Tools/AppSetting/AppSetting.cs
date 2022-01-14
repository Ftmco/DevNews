using Newtonsoft.Json.Linq;

namespace Tools.AppSetting;

public static class AppSetting
{
    public static async Task<string> GetDataAsync(this string obj, string key)
        => await Task.Run(async () =>
        {
            string? file = await File.ReadAllTextAsync(Directory.GetCurrentDirectory() + "/appsettings.json");
            JObject? json = JObject.Parse(file);
            return json[obj][key].ToString();
        });
}