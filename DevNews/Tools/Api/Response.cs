using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Tools.Crypto;
using ViewModel.Api;

namespace Tools.Api;

public static class ApiHelper
{
    public static async Task<string> SendResponseAsync(this ApiModel api, HttpContext httpContext)
        => await Task.Run(() =>
        {
            string? key = httpContext.KeyMaker();
            string? encodeData = api.ToString().Encrypt(key);
            return encodeData;
        });

    public static async Task<TRequest?> ReadRequestDataAsync<TRequest>(this ApiRequest request, HttpContext httpContext)
        => await Task.Run(() =>
        {
            string? key = httpContext.KeyMaker();
            string? decodeData = request.Data.Decrypt(key);
            TRequest? requestModel = JsonConvert.DeserializeObject<TRequest>(decodeData);
            return requestModel;
        });
}