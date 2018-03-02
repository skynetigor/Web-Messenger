using Messenger.Core.DAL.Models;
using Messenger.DAL.Sql.Context;
using Microsoft.EntityFrameworkCore;

namespace Messenger.DAL.Sql.Repository
{
    internal class UsersSqlRepository : GenericSqlRepository<User>
    {
        public UsersSqlRepository(ApplicationContext context)
            : base(context)
        {
            this.Query = this.DbSet.Include(u => u.Room);
        }
    }
}