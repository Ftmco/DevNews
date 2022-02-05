using Entity.Page;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Rules;

public interface IPageRules : IDisposable
{
    Task<Page> GetPageByTokenAsync(string token);
}
