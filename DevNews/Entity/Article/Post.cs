namespace Entity.Article;

public class Post
{
    [Key]
    public Guid Id { get; set; }

    public string Message { get; set; }

    public DateTime CreateDate { get; set; }
}
