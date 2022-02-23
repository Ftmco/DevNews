using Service.Rules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service;

public class CourseServices : ICourseRules
{
    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }
}
