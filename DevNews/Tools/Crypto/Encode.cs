using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tools.Crypto;

public static class Encode
{
    public static string Encrypt(this string text, string key, bool revert = false)
    {
        string newString = "";

        for (int i = 0; i < text.Length; i++)
            newString += (char)(i + (revert ? (Math.Abs(key.Length - i) % key.Length) : (i % key.Length)));

        return newString;
    }

    public static string Decrypt(this string text, string key, bool revert = false)
    {
        string newString = "";

        for (int i = 0; i < text.Length; i++)
            newString += (char)(i - (revert ? (Math.Abs(key.Length - i) % key.Length) : (i % key.Length)));

        return newString;
    }

    public static string KeyMaker(this HttpContext httpContext)
    {
        byte[]? bytes = Encoding.UTF8.GetBytes(httpContext.Request.Path.ToString());
        string? base64 = Convert.ToBase64String(bytes);
        return base64.ToString();
    }
}
