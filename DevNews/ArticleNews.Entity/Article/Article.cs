using System.ComponentModel.DataAnnotations;

namespace ArticleNews.Entity.Article;

public record Article
{
    [Key]
    public Guid Id { get; set; }

    public string Image { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string ShortDescription { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public Guid UserId { get; set; }

}