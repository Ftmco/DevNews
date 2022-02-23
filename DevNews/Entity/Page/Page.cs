using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Page;

public record Page
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    public string About { get; set; }

    [Required]
    public string Link { get; set; }

    [Required]
    public string Token { get; set; }

    [Required]
    public short Type { get; set; }

    [Required]
    public DateTime CreateDate { get; set; }

    [Required]
    public Guid OwnerId { get; set; }
}