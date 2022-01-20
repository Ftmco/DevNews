using Entity.User;
using Microsoft.AspNetCore.Http;
using ViewModel.Account;

namespace Service.Rules;

public interface IAccountRules : IDisposable
{
    Task<LoginResponse> LoginAsync(LoginViewModel login);

    Task<SignUpStatus> SignUpAsync(SignUpViewModel signUp);

    Task<ActivationStatus> ActivationAsync(ActivationViewModel activation);

    Task<User> GetUserBySessionAsync(IHeaderDictionary headers);
}
