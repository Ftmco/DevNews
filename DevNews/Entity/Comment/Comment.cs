namespace Entity.Comment;

public class Comment
{
    [Key]
    public Guid Id { get; set; }

    public string Text { get; set; }
}
