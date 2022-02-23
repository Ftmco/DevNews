namespace Entity.User;

public record Settings
{
    [Key]
    public int Id { get; set; }

    [Required]
    public Guid UserId { get; set; }

    [Required]
    public string Theme { get; set; }

    [Required]
    public int Lang { get; set; }
}
