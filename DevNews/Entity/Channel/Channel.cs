namespace Entity.Channel;

public class Channel
{
    [Key]
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string About { get; set; }

    public string Avatar { get; set; }

    public DateTime CreateDate { get; set; }

    public Guid OwnerId { get; set; }
}
