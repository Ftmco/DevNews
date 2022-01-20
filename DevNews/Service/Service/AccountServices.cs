using Entity.User;
using Microsoft.AspNetCore.Http;
using Service.Rules;
using Services.Base;
using Tools.Code;
using ViewModel.Account;

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
                    Session session = await _session.CreatSessionAsync(user.Id);
                    return session != null
                        ? new LoginResponse(LoginStatus.Success, new(session.Key, session.Value))
                        : new LoginResponse(LoginStatus.Exception, null);
                }
                return new LoginResponse(LoginStatus.UserNotActive, null);
            }
            return new LoginResponse(LoginStatus.UserNotFound, null);
        });

    public async Task<SignUpStatus> SignUpAsync(SignUpViewModel signUp)
        => await Task.Run(async () =>
        {
            if (await _user.GetUserByUserNameAsync(signUp.UserName) == null &&
                await _user.GetUserByUserNameAsync(signUp.Email) == null &&
                await _user.GetUserByUserNameAsync(signUp.MobileNo) == null)
            {
                User newUser = await _user.CreateUserAsync(signUp);
                return newUser != null ? SignUpStatus.Success : SignUpStatus.Exception;
            }
            return SignUpStatus.UserExist;
        });


}
