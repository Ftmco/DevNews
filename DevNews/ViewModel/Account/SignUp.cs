using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Account;

public record SignUpViewModel(string UserName,string? Email,string? MobileNo,string Password);

public enum SignUpStatus
{
    Success = 0,
    UserExist = 1,
    Exception = 2
}