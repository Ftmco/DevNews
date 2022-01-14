namespace Entity.Article;

public class ArticleCategories
{
    [Key]
    public Guid Id { get; set; }
   
    [Required]
    public Guid ArticleId { get; set; }

    [Required]
    public Guid CategoryId { get; set; }

    public virtual Category Category { get; set; }

    public virtual Article Article { get; set; }
}
