using Entity.User;
using Service.Rules;
using Tools.Crypto;
using ViewModel.Account;

namespace Service.Service;

public class SessionServices : ISessionRules
{
    private readonly IBaseRules<Session> _sessionCrud;

    public SessionServices(IBaseRules<Session> sessionCrud)
    {
        _sessionCrud = sessionCrud;
    }

    public async Task<Session> CreatSessionAsync(Guid userId, LoginViewModel login)
        => await Task.Run(async () =>
        {
            Session session = new()
            {
                CreateDate = DateTime.Now,
                ExpireDate = DateTime.Now.AddDays(20),
                Key = "Token",
                UserId = userId,
                Value = $"{Guid.NewGuid()}".CreateSHA256(),
                Platform = login.Platform,
                UserClient = login.UserClient,
            };
            return await _sessionCrud.InsertAsync(session) ?
              session : null;
        });

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public Task<Session> GetSessionAsync(string value)
            => Task.Run(async () => await _sessionCrud.FirstOrDefaultAsync(s => s.Value == value));
}
