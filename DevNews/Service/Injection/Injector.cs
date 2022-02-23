using Entity.Application;
using Entity.Article;
using Entity.Channel;
using Entity.Comment;
using Entity.Explore;
using Entity.Page;
using Entity.User;
using Microsoft.Extensions.DependencyInjection;
using Service.Rules;
using Service.Service;

namespace Service.Injection;

public static class Injector
{
    public static IServiceCollection AddDependencies(this IServiceCollection service)
    {
        service.AddBaseDependency();
        service.AddServiceDepdency();
        service.AddToolsDependncy();
        return service;
    }

    public static IServiceCollection AddBaseDependency(this IServiceCollection service)
    {
        service.AddScoped<IBaseRules<Article>, BaseServices<Article>>();
        service.AddScoped<IBaseRules<ArticleCategories>, BaseServices<ArticleCategories>>();
        service.AddScoped<IBaseRules<Category>, BaseServices<Category>>();
        service.AddScoped<IBaseRules<Entity.Article.TFile>, BaseServices<Entity.Article.TFile>>();
        service.AddScoped<IBaseRules<Post>, BaseServices<Post>>();
        service.AddScoped<IBaseRules<Channel>, BaseServices<Channel>>();
        service.AddScoped<IBaseRules<ChannelsAdmins>, BaseServices<ChannelsAdmins>>();
        service.AddScoped<IBaseRules<ChannelsUsers>, BaseServices<ChannelsUsers>>();
        service.AddScoped<IBaseRules<Comment>, BaseServices<Comment>>();
        service.AddScoped<IBaseRules<Session>, BaseServices<Session>>();
        service.AddScoped<IBaseRules<User>, BaseServices<User>>();
        service.AddScoped<IBaseRules<Explore>, BaseServices<Explore>>();
        service.AddScoped<IBaseRules<VisitArticles>, BaseServices<VisitArticles>>();
        service.AddScoped<IBaseRules<Page>, BaseServices<Page>>();
        service.AddScoped<IBaseRules<Settings>, BaseServices<Settings>>();
        service.AddScoped<IBaseRules<Language>, BaseServices<Language>>();
        service.AddScoped<IBaseRules<AppItems>, BaseServices<AppItems>>();

        return service;
    }

    public static IServiceCollection AddServiceDepdency(this IServiceCollection service)
    {
        service.AddTransient<IAccountRules, AccountServices>();
        service.AddTransient<IArticleRules, ArticleServices>();
        service.AddTransient<ICategoryRules, CategoryServices>();
        service.AddTransient<IChannelRules, ChannelServices>();
        service.AddTransient<IFileRules, FileServices>();
        service.AddTransient<ISessionRules, SessionServices>();
        service.AddTransient<IUserRules, UserServices>();
        service.AddTransient<IProfileRules, ProfileServices>();
        service.AddTransient<IPostRules, PostServices>();
        service.AddTransient<ISearchRules, SearchServices>();
        service.AddTransient<IPageRules, PageServices>();
        service.AddTransient<IApplicationRules, ApplicationServices>();
        return service;
    }

    public static IServiceCollection AddToolsDependncy(this IServiceCollection service)
    {
        return service;
    }
}