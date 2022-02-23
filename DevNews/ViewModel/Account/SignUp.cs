namespace ViewModel.Account;

public record SignUpViewModel(string UserName, string? Email, string? MobileNo, string Password);

public enum SignUpStatus
{
    Success = 0,
    UserExist = 1,
    Exception = 2
}