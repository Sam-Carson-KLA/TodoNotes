using System;
using Microsoft.EntityFrameworkCore;

namespace todo_list_app.Models
{
    public class NoteContext : DbContext
    {
        public NoteContext(DbContextOptions<NoteContext> options)
            : base(options)
        {
        }

        public DbSet<List> ListItems { get; set; }
        public DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=NoteDB;User Id=sa;Password=yourStrong(!)Password;");
        }
    }
}
