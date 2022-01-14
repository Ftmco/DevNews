namespace Entity.Channel;

public class ChannelsUsers
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Guid ChannelId { get; set; }

    [Required]
    public Guid UserId { get; set; }

    public virtual User.User User { get; set; }

    public virtual Channel Channel { get; set; }
}
