using Entity.Application;
using Entity.Article;
using Entity.Channel;
using Entity.Class;
using Entity.Comment;
using Entity.Course;
using Entity.Explore;
using Entity.Page;
using Entity.User;
using Microsoft.EntityFrameworkCore;
using Tools.AppSetting;

namespace DataLayer.Context;

public class ArticleContext : DbContext
{
    public ArticleContext(DbContextOptions<ArticleContext> options) : base(options)
    {

    }

    public ArticleContext()
    {

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            string cnn = "ConnectionStrings".GetDataAsync("Article").Result;
            optionsBuilder.UseSqlServer(cnn);
        }
    }

    public virtual DbSet<Article> Article { get; set; }

    public virtual DbSet<ArticleCategories> ArticleCategories { get; set; }

    public virtual DbSet<Category> Category { get; set; }

    public virtual DbSet<Entity.Article.TFile> File { get; set; }

    public virtual DbSet<Post> Post { get; set; }

    public virtual DbSet<Channel> Channel { get; set; }

    public virtual DbSet<ChannelsAdmins> ChannelsAdmins { get; set; }

    public virtual DbSet<ChannelsUsers> ChannelsUsers { get; set; }

    public virtual DbSet<Comment> Comment { get; set; }

    public virtual DbSet<Session> Session { get; set; }

    public virtual DbSet<User> User { get; set; }

    public virtual DbSet<VisitArticles> VisitArticles { get; set; }

    public virtual DbSet<Explore> Explore { get; set; }

    public virtual DbSet<Page> Page { get; set; }

    public virtual DbSet<Cource> Course { get; set; }

    public virtual DbSet<Class> Class { get; set; }

    public virtual DbSet<Settings> Settings { get; set; }

    public virtual DbSet<Language> Language { get; set; }

    public virtual DbSet<AppItems> AppItems { get; set; }
}
