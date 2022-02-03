using Microsoft.EntityFrameworkCore;
using Tools.AppSetting;

namespace Trainer.Data.Context;

public class TrainerContext : DbContext
{
    public TrainerContext(DbContextOptions<TrainerContext> options) : base(options)
    { }

    public TrainerContext()
    { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            string cnn = "ConnectionStrings".GetDataAsync("Trainer").Result;
            optionsBuilder.UseSqlServer(cnn);
        }
    }
}
