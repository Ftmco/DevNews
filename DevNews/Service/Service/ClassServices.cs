using Service.Rules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service;

public class ClassServices : IClassRules
{
    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }
}
