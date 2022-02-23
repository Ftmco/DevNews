namespace Entity.Article;

public class Article
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string ShortDescription { get; set; }

    [Required]
    public string Text { get; set; }

    public string Tags { get; set; }

    [Required]
    public Guid OwnerId { get; set; }

    [Required]
    public short OwnerType { get; set; }


    public virtual ICollection<ArticleCategories> ArticleCategories { get; set; }

}
