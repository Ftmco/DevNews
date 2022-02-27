using DataLayer.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tools.AppSetting;
using Trainer.Data.Context;

namespace Train.Service.Injector;

public static class Injection
{
    public static IServiceCollection AddDbContext(this IServiceCollection services)
    {
        services.AddDbContext<ArticleContext>(opt =>
        {
            string cnn = "ConnectionStrings".GetDataAsync("Article").Result;
            opt.UseSqlServer(cnn);
        });
        services.AddDbContext<TrainerContext>(opt =>
       {
           string cnn = "ConnectionStrings".GetDataAsync("Trainer").Result;
           opt.UseSqlServer(cnn);
       });
        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        return services;
    }
}
