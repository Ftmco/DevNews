using Entity.User;
using Tools.FileTools;
using ViewModel.Profile;

namespace Service.Extensions;

public static class UserExtensions
{
    public static async Task<ProfileViewModel> CreateProfileViewModelAsync(this User user)
        => await Task.Run(async () =>
        new ProfileViewModel(
            UserName: user.UserName,
            Email: user.Email,
            MobileNo: user.MobileNo,
            FullName: user.FullName,
            Image: await user.Image.CreateFileAddressAsync("Files/UserProfile")
            ));
}