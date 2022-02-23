namespace ViewModel.Account;

public record ActivationViewModel(string UserName, string ActiveCode);

public enum ActivationStatus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2,
    WrongCode = 3
}