using Messenger.Core.DAL.Models;
using Messenger.DAL.MongoDB.Context;

namespace Messenger.DAL.MongoDB.Repositories
{
    internal class UsersMongoRepository : GenericMongoRepository<User>
    {
        public UsersMongoRepository(MongoAppContext context)
            : base(context)
        {
            this.Query = this.ModelsProvider.Include(m => m.Room);
        }
    }
}