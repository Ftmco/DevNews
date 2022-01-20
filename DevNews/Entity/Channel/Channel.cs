using Entity.Article;

namespace Entity.Channel;

public record Channel
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    public string About { get; set; }
    
    [Required]
    public string Link {get;set;} 
        
    [Required]
    public string Token {get;set;} 
    
    [Required]
    public short Type {get;set;} 

    [Required]
    public DateTime CreateDate { get; set; }

    [Required]
    public Guid OwnerId { get; set; }

    public virtual ICollection<ChannelsUsers> ChannelsUsers { get; set; }

    public virtual ICollection<ChannelsAdmins> ChannelsAdmins { get; set; }

}
