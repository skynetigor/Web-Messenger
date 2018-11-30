using Messenger.Core.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Messenger.DAL.Sql.Context
{
    internal class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
            : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<Message> Messages { get; set; }
    }
}