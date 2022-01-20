using Entity.User;
using Microsoft.AspNetCore.Http;
using Service.Extensions;
using Service.Rules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel.Profile;

namespace Service.Service;

public class ProfileServices : IProfileRules
{
    private readonly IAccountRules _account;

    public ProfileServices(IAccountRules account)
    {
        _account = account;
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);  
    }

    public async Task<GetProileResponse> GetProfileAsync(IHeaderDictionary headers)
        => await Task.Run(async () =>
        {
            User user = await _account.GetUserBySessionAsync(headers);
            return user != null
                ? new GetProileResponse(ProfileStatus.Success,await user.CreateProfileViewModelAsync())
                : new GetProileResponse(ProfileStatus.UserNotFound, null);
        });
}
