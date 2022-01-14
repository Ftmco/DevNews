namespace Entity.User;

public class Session
{
    [Key]
    public Guid Id { get; set; }

    public DateTime CreateDate { get; set; }

    public DateTime ExpireDate { get; set; }

    public string Key { get; set; }

    public string Value { get; set; }

    public Guid UserId { get; set; }
}
