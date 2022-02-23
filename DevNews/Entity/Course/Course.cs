using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Course;

public record Cource
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Title { get; set; }


    [Required]
    public string Description { get; set; }

    [Required]
    public short Type { get; set; }

    [Required]
    public Guid Banner { get; set; }

    [Required]
    public short OwnerType { get; set; }

    [Required]
    public Guid OwnerId { get; set; }
}
