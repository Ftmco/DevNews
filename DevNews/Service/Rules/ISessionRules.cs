using Entity.User;
using ViewModel.Account;

namespace Service.Rules;

public interface ISessionRules : IDisposable
{
    Task<Session> CreatSessionAsync(Guid userId, LoginViewModel login);

    Task<Session> GetSessionAsync(string value);
}
