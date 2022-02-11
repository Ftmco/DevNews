using Entity.User;
using Microsoft.AspNetCore.Http;
using Service.Rules;
using Tools.Api;
using Tools.Code;
using ViewModel.Account;
using ViewModel.Api;

namespace Service.Service;

public class AccountServices : IAccountRules
{
    private readonly IUserRules _user;

    private readonly ISessionRules _session;

    private readonly IBaseRules<User> _userCrud;

    public AccountServices(IUserRules user, ISessionRules session, IBaseRules<User> userCrud)
    {
        _user = user;
        _session = session;
        _userCrud = userCrud;
    }

    public async Task<ActivationStatus> ActivationAsync(ActivationViewModel activation)
        => await Task.Run(async () =>
       {
           User user = await _user.GetUserByUserNameAsync(activation.UserName);
           if (user != null)
           {
               if (user.ActiveCode == activation.ActiveCode)
               {
                   user.IsActiive = true;
                   user.ActiveCode = 5.GenerateNumberCode();
                   return await _userCrud.UpdateAsync(user) ?
                        ActivationStatus.Success : ActivationStatus.Exception;
               }
               return ActivationStatus.WrongCode;
           }
           return ActivationStatus.UserNotFound;
       });

    public async Task<ActivationStatus> ActivationAsync(ApiRequest request, HttpContext httpContext)
        => await Task.Run(async () =>
        {
            ActivationViewModel activation = await request.ReadRequestDataAsync<ActivationViewModel>(httpContext);
            return await ActivationAsync(activation);
        });

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<User> GetUserBySessionAsync(IHeaderDictionary headers)
        => await Task.Run(async () =>
        {
            Session session = await _session.GetSessionAsync(headers["Token"].ToString());
            return session != null ? await _userCrud.GetAsync(session.UserId) : null;
        });

    public async Task<LoginResponse> LoginAsync(LoginViewModel login)
        => await Task.Run(async () =>
        {
            User user = await _user.GetUserByUserNameAsync(login.UserName);
            if (user != null)
            {
                if (user.IsActiive)
                {
                    Session session = await _session.CreatSessionAsync(user.Id, login);
                    return session != null
                        ? new LoginResponse(LoginStatus.Success, new(session.Key, session.Value))
                        : new LoginResponse(LoginStatus.Exception, null);
                }
                return new LoginResponse(LoginStatus.UserNotActive, null);
            }
            return new LoginResponse(LoginStatus.UserNotFound, null);
        });

    public async Task<LoginResponse> LoginAsync(ApiRequest request, HttpContext httpContext)
        => await Task.Run(async () =>
        {
            LoginViewModel login = await request.ReadRequestDataAsync<LoginViewModel>(httpContext);
            return await LoginAsync(login);
        });

    public async Task<SignUpStatus> SignUpAsync(SignUpViewModel signUp)
        => await Task.Run(async () =>
        {
            if (await _user.GetUserByUserNameAsync(signUp.UserName) != null)
                return SignUpStatus.UserExist;
            if (await _user.GetUserByUserNameAsync(signUp.Email) != null)
                return SignUpStatus.UserExist;
            if (await _user.GetUserByUserNameAsync(signUp.MobileNo) != null)
                return SignUpStatus.UserExist;

            User newUser = await _user.CreateUserAsync(signUp);
            return newUser != null ? SignUpStatus.Success : SignUpStatus.Exception;
        });

    public async Task<SignUpStatus> SignUpAsync(ApiRequest request, HttpContext httpContext)
        => await Task.Run(async () =>
        {
            SignUpViewModel signUp = await request.ReadRequestDataAsync<SignUpViewModel>(httpContext);
            return await SignUpAsync(signUp);
        });
}
