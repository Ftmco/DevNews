namespace ViewModel.Account;

public record LoginViewModel(string UserName, string Password, string Platform, string UserClient);

public record LoginResponse(LoginStatus Status, SessionViewModel Session);

public record SessionViewModel(string Key, string Value);

public enum LoginStatus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2,
    UserNotActive = 3
}