using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=Trainer_Db;Integrated Security=True");
        }
    }
}
