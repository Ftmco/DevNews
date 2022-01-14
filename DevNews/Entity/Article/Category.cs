namespace Entity.Article;

public class Category
{
    [Key]
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Name { get; set; }
}
