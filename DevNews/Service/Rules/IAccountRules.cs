using ViewModel.Account;

namespace Service.Rules;

public interface IAccountRules : IDisposable
{
    Task<LoginResponse> LoginAsync(LoginViewModel login);

    Task<SignUpStatus> SignUpAsync(SignUpViewModel signUp);

    Task<ActivationStatus> ActivationAsync(ActivationViewModel activation);
}
