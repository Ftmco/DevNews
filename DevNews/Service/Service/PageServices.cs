using Entity.Page;
using Service.Rules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service;

public class PageServices : IPageRules
{
    public void Dispose()
    {
       GC.SuppressFinalize(this);
    }

    public Task<Page> GetPageByTokenAsync(string token)
    {
        throw new NotImplementedException();
    }
}
