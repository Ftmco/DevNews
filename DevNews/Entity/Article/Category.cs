namespace Entity.Article;

public class Category
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Name { get; set; }

    public Guid? ParrentId { get; set; }

    public virtual ICollection<ArticleCategories> ArticleCategories { get; set; }
}
