using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Application;

public record AppItems
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int LangId { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Icon { get; set; }

    //Navigation Property
    //Relationships
    public virtual Language Language { get; set; }
}
