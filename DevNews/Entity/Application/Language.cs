using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Application;

public record Language
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Code { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public bool IsActive { get; set; }

    [Required]
    public DateTime CreateDate { get; set; }

    //Navigation Property
    //Relationships

    public virtual ICollection<AppItems> AppItems { get; set; }
}
