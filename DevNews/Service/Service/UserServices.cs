using Entity.User;
using Service.Rules;
using Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tools.Code;
using Tools.Crypto;
using ViewModel.Account;

namespace Service.Service;

public class UserServices : IUserRules
{
    private readonly IBaseRules<User> _userCrud;

    public UserServices(IBaseRules<User> userCrud)
    {
        _userCrud = userCrud;
    }

    public async Task<User> CreateUserAsync(SignUpViewModel signUp)
        => await Task.Run(async () =>
        {
            User newUser = new()
            {
                ActiveCode = 5.GenerateNumberCode(),
                Email = signUp.Email,
                IsActiive = false,
                MobileNo = signUp.MobileNo,
                Password = signUp.Password.CreateSHA256(),
                RegisterDate = DateTime.Now,
                UserName = signUp.UserName
            };
            return await _userCrud.InsertAsync(newUser) ?
               newUser : null;
        });

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<User> FindUserAsync(string userName, string password)
        => await Task.Run(async () =>
        {
            User user = await GetUserByUserNameAsync(userName);
            return user != null
                ? user.Password == password.CreateSHA256() ?
                    user : null
                : null;
        });

    public async Task<User> GetUserByUserNameAsync(string userName)
        => await Task.FromResult(await _userCrud.FirstOrDefaultAsync(u =>
         u.UserName == userName || u.MobileNo == userName || u.Email == userName));
}
