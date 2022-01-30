using DataLayer.Context;
using Microsoft.EntityFrameworkCore;
using Service.Injection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ArticleContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Article")));
builder.Services.AddDependencies();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(c =>
{
    c.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin();
});

app.UseStaticFiles();

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
