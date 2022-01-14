namespace Entity.Channel;

public class ChannelsUsers
{
    [Key]
    public Guid Id { get; set; }

    public Guid ChannelId { get; set; }

    public Guid UserId { get; set; }
}
