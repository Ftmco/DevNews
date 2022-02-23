using Entity.Application;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Rules;

public interface IApplicationRules : IDisposable
{
    Task<IEnumerable<Language>> GetLanguagesAsync();

    Task<IEnumerable<AppItems>> GetApplicationItemsAsync(int lagnId);
}
