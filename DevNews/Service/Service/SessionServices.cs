using Entity.User;
using Service.Rules;
using Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tools.Crypto;

namespace Service.Service;

public class SessionServices : ISessionRules
{
    private readonly IBaseRules<Session> _sessionCrud;

    public SessionServices(IBaseRules<Session> sessionCrud)
    {
        _sessionCrud = sessionCrud;
    }

    public async Task<Session> CreatSessionAsync(Guid userId)
        => await Task.Run(async () =>
        {
            Session session = new()
            {
                CreateDate = DateTime.Now,
                ExpireDate = DateTime.Now.AddDays(20),
                Key = "Token",
                UserId = userId,
                Value = $"{Guid.NewGuid()}".CreateSHA256(),
            };
            return await _sessionCrud.InsertAsync(session) ?
              session : null;
        });

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }
}
