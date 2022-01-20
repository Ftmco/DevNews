using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel.Profile;

namespace Service.Rules;

public interface IProfileRules : IDisposable
{
    Task<GetProileResponse> GetProfileAsync(IHeaderDictionary headers);
}
