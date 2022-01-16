using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Account;

public record ActivationViewModel(string UserName, string ActiveCode);

public enum ActivationStatus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2,
    WrongCode = 3
}