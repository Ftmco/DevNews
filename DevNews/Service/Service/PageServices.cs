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
    private readonly IBaseRules<Page> _pageCrud;

    public PageServices(IBaseRules<Page> pageCrud)
    {
        _pageCrud = pageCrud;
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<Page> GetPageByTokenAsync(string token)
        => await Task.Run(async () => await _pageCrud.FirstOrDefaultAsync(p => p.Token == token));
}
