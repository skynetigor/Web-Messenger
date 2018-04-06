using System.Linq;
using Messenger.Core.DAL.Models;
using Messenger.DAL.MongoDB.Context;

namespace Messenger.DAL.MongoDB.Repositories
{
    internal class UsersMongoRepository : GenericMongoRepository<User>
    {
        protected override IQueryable<User> Query { get; }

        public UsersMongoRepository(MongoAppContext context)
            : base(context)
        {
            this.Query = this.ModelsProvider.UseEagerLoading().Include(m => m.Room);
        }

    }
}