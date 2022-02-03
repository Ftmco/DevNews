using Entity.User;
using ViewModel.Account;

namespace Service.Rules;

public interface IUserRules : IDisposable
{
    Task<User> GetUserByUserNameAsync(string userName);

    Task<User> FindUserAsync(string userName, string password);
    Task<User> CreateUserAsync(SignUpViewModel signUp);
}
