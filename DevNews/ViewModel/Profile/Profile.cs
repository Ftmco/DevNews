using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Profile;

public record ProfileViewModel(string UserName, string Email, string MobileNo, string FullName, string Image);

public record GetProileResponse(ProfileStatus Status,ProfileViewModel Profile);

public enum ProfileStatus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2
}