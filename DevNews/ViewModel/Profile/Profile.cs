using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel.File;

namespace ViewModel.Profile;

public record ProfileViewModel(string UserName, string Email, string MobileNo, string FullName, IEnumerable<Entity.Article.File> Image);

public record UpdateProfileViewModel(string UserName, string FullName, UploadFileViewModel Image);

public record ProfileResponse(ProfileStatus Status, ProfileViewModel Profile);

public enum ProfileStatus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2,
    UserNameExist = 3
}