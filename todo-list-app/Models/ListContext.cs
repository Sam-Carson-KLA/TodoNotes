using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class ListContext : DbContext
    {
        public ListContext(DbContextOptions<ListContext> options)
            : base(options)
        {
        }

        public DbSet<List> ListItems { get; set; }
    }
}
