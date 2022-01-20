using Entity.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Rules;

public interface ISessionRules : IDisposable
{
    Task<Session> CreatSessionAsync(Guid userId);

    Task<Session> GetSessionAsync(string value);
}
