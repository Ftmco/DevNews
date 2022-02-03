using Entity.User;
using Service.Rules;
using Tools.Code;
using Tools.Crypto;
using Tools.Email;
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
            if (await _userCrud.InsertAsync(newUser))
            {
                await new List<string> { newUser.Email }.SendEmailAsync("Active Code", $"Article News : Account Active Code <h1>{newUser.ActiveCode}</h1>");
                return newUser;
            }
            return null;
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
