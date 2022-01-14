namespace Entity.Channel;

public class ChannelsAdmins
{
    [Key]
    public Guid Id { get; set; }

    public Guid ChannelId { get; set; }

    public Guid UserId { get; set; }
}
