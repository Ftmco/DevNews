using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Class;

public record Class
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Token { get; set; }

    [Required]
    public string About { get; set; }

    [Required]
    public string Link { get; set; }
}