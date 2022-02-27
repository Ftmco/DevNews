using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Rules;

public interface ICommentRules : IDisposable
{
    Task CreateCommentAsync();
}
