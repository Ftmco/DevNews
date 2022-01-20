using Entity.Channel;

namespace Entity.User;

public record User
{
    [Key]
    public Guid Id { get; set; }

    public string FullName { get; set; }

    [Required]
    public string UserName { get; set; }

    public string Email { get; set; }

    public string MobileNo { get; set; }

    [Required]
    public DateTime RegisterDate { get; set; }

    [Required]
    public bool IsActiive { get; set; }

    [Required]
    public string ActiveCode { get; set; }

    [Required]
    public string Password { get; set; }

    public string Image { get; set; }

    public virtual ICollection<Session> Session { get; set; }

    public virtual ICollection<ChannelsUsers> ChannelsUsers { get; set; }

    public virtual ICollection<ChannelsAdmins> ChannelsAdmins { get; set; }
}
