using Microsoft.EntityFrameworkCore;

namespace ArticleNews.DataLayer.Context;

public class ArticleNewsContext : DbContext
{
    public ArticleNewsContext(DbContextOptions<ArticleNewsContext> options) : base(options)
    { }
}