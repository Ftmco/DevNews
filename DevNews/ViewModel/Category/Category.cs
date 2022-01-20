using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Category;

public record CategoryViewModel(Guid Id, string Name, string Title, CategoryViewModel? Parent);

public record GetCategoriesResponse(CategoryStatus Status, IEnumerable<CategoryViewModel> Categories);

public enum CategoryStatus
{
    Success = 0,
    Exception = 2
}