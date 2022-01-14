namespace Entity.Article;

public class ArticleCategories
{
    [Key]
    public Guid Id { get; set; }

    public Guid ArticleId { get; set; }

    public Guid CategoryId { get; set; }
}
