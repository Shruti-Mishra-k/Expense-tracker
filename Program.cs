using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=ExpenseDB;Trusted_Connection=True;"));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/transactions", async (AppDbContext db) =>
    await db.Transactions.ToListAsync());

app.MapPost("/api/add", async (Transaction t, AppDbContext db) =>
{
    db.Transactions.Add(t);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.MapDelete("/api/delete/{id}", async (int id, AppDbContext db) =>
{
    var item = await db.Transactions.FindAsync(id);
    if (item != null)
    {
        db.Transactions.Remove(item);
        await db.SaveChangesAsync();
    }
    return Results.Ok();
});

app.Run();