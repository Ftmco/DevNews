using Entity.User;
using Microsoft.AspNetCore.Http;
using ViewModel.Account;
using ViewModel.Api;

namespace Service.Rules;

public interface IAccountRules : IDisposable
{
    Task<LoginResponse> LoginAsync(LoginViewModel login);

    Task<LoginResponse> LoginAsync(ApiRequest request,HttpContext httpContext);

    Task<SignUpStatus> SignUpAsync(SignUpViewModel signUp);

    Task<ActivationStatus> ActivationAsync(ActivationViewModel activation);

    Task<User> GetUserBySessionAsync(IHeaderDictionary headers);
}
