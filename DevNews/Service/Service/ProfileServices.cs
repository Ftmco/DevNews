using Entity.User;
using Microsoft.AspNetCore.Http;
using Service.Rules;
using Tools.AppSetting;
using Tools.FileTools;
using ViewModel.File;
using ViewModel.Profile;

namespace Service.Service;

public class ProfileServices : IProfileRules
{
    private readonly IAccountRules _account;

    private readonly IUserRules _user;

    private readonly IBaseRules<User> _userCrud;

    private readonly IBaseRules<Entity.Article.File> _fileCrud;

    public ProfileServices(IAccountRules account, IBaseRules<User> userCrud,
        IBaseRules<Entity.Article.File> fileCrud, IUserRules user)
    {
        _account = account;
        _userCrud = userCrud;
        _fileCrud = fileCrud;
        _user = user;
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
                User existUser = await _user.GetUserByUserNameAsync(profile.UserName);
                if (existUser == null || existUser.Id == user.Id)
                {
                    if (profile.Image != null)
                    {
                        var directory = await "Directories".GetDataAsync("User");
                        var save = await new SaveFileViewModel(profile.Image.Base64, directory).SaveFileAsync();
                        Entity.Article.File profileImage = new()
                        {
                            CreateDate = DateTime.Now,
                            Directory = directory,
                            Name = save.Name,
                            ObjectId = user.Id,
                            OrginalName = profile.Image.OgName,
                            Size = save.Size,
                            Type = save.Type,
                            ObjectType = 0
                        };
                        await _fileCrud.InsertAsync(profileImage);
                    }
                    user.UserName = profile.UserName;
                    return await _userCrud.UpdateAsync(user) ?
                          new ProfileResponse(ProfileStatus.Success, await GetProfileViewModelAsync(user)) :
                                new ProfileResponse(ProfileStatus.Exception, null);
                }

                return new ProfileResponse(ProfileStatus.UserNameExist, null);
            }
            return new ProfileResponse(ProfileStatus.UserNotFound, null);
        });

    public Task<ProfileResponse> UpdateProfileAsync(ApiRequest reqeust, HttpContext httpContext)
    {
        throw new NotImplementedException();
    }
}
