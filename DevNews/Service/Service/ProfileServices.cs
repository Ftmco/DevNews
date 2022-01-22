using Entity.User;
using Microsoft.AspNetCore.Http;
using Service.Rules;
using Services.Base;
using ViewModel.Profile;

namespace Service.Service;

public class ProfileServices : IProfileRules
{
    private readonly IAccountRules _account;

    private readonly IBaseRules<User> _userCrud;

    private readonly IBaseRules<Entity.Article.File> _fileCrud;

    public ProfileServices(IAccountRules account, IBaseRules<User> userCrud, IBaseRules<Entity.Article.File> fileCrud)
    {
        _account = account;
        _userCrud = userCrud;
        _fileCrud = fileCrud;
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<ProfileResponse> GetProfileAsync(IHeaderDictionary headers)
        => await Task.Run(async () =>
        {
            User user = await _account.GetUserBySessionAsync(headers);
            return user != null
                ? new ProfileResponse(ProfileStatus.Success, await GetProfileViewModelAsync(user))
                : new ProfileResponse(ProfileStatus.UserNotFound, null);
        });

    public async Task<ProfileViewModel> GetProfileViewModelAsync(User user)
        => await Task.Run(async () =>
        {
            ProfileViewModel profile = new(
                UserName: user.UserName,
                Email: user.Email,
                MobileNo: user.MobileNo,
                FullName: user.FullName,
                Image: await _fileCrud.GetAsync(up => up.ObjectId == user.Id));
            return profile;
        });

    public async Task<ProfileResponse> UpdateProfileAsync(UpdateProfileViewModel profile, IHeaderDictionary headers)
        => await Task.Run(async () =>
        {
            User user = await _account.GetUserBySessionAsync(headers);
            if (user != null)
            {
                user.FullName = profile.FullName;
                if (!await _userCrud.AnyAsync(u => u.UserName == profile.UserName.ToLower()))
                {
                    user.UserName = profile.UserName;
                    return await _userCrud.UpdateAsync(user) ?
                          new ProfileResponse(ProfileStatus.Success, await GetProfileViewModelAsync(user)) :
                                new ProfileResponse(ProfileStatus.Exception, null);
                }

                return new ProfileResponse(ProfileStatus.UserNameExist, null);
            }
            return new ProfileResponse(ProfileStatus.UserNotFound, null);
        });
}
