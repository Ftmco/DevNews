using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tools.Code;

public static class CodeGenerator
{
    public static string GenerateNumberCode(this int count)
        => Guid.NewGuid().GetHashCode().ToString()[..count];
}