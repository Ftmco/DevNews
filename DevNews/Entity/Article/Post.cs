namespace Entity.Article;

public class Post
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Message { get; set; }

    [Required]
    public DateTime CreateDate { get; set; }

    [Required]
    public Guid OwnerId { get; set; }

    [Required]
    public short OwnerType { get; set; }

}
