using Entity.User;
using Microsoft.AspNetCore.Http;
using ViewModel.Profile;

namespace Service.Rules;

public interface IProfileRules : IDisposable
{
    Task<ProfileResponse> GetProfileAsync(IHeaderDictionary headers);

    Task<ProfileViewModel> GetProfileViewModelAsync(User user);

    Task<ProfileResponse> UpdateProfileAsync(UpdateProfileViewModel profile, IHeaderDictionary headers);
}
