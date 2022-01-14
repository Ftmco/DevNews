﻿using Entity.Article;
using Entity.Channel;
using Entity.Comment;
using Entity.User;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Context;

public class ArticleContext : DbContext
{
    public ArticleContext(DbContextOptions<ArticleContext> options) : base(options)
    {

    }

    public virtual DbSet<Article> Article { get; set; }

    public virtual DbSet<ArticleCategories> ArticleCategories { get; set; }

    public virtual DbSet<Category> Category { get; set; }

    public virtual DbSet<Entity.Article.File> File { get; set; }

    public virtual DbSet<Post> Post { get; set; }

    public virtual DbSet<Channel> Channel { get; set; }

    public virtual DbSet<ChannelsAdmins> ChannelsAdmins { get; set; }

    public virtual DbSet<ChannelsUsers> ChannelsUsers { get; set; }

    public virtual DbSet<Comment> Comment { get; set; }

    public virtual DbSet<Session> Session { get; set; }

    public virtual DbSet<User> User { get; set; }
}