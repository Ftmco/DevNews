﻿using Entity.User;
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
    Task<ProfileResponse> GetProfileAsync(IHeaderDictionary headers);

    Task<ProfileViewModel> GetProfileViewModelAsync(User user);

    Task<ProfileResponse> UpdateProfileAsync(UpdateProfileViewModel profile,IHeaderDictionary headers);
}
