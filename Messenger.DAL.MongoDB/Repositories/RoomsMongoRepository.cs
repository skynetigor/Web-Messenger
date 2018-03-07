using System.Linq;
using Messenger.Core.DAL.Models;
using Messenger.DAL.MongoDB.Context;

namespace Messenger.DAL.MongoDB.Repositories
{
    internal class RoomsMongoRepository : GenericMongoRepository<Room>
    {
        public RoomsMongoRepository(MongoAppContext context)
            : base(context)
        {
            this.Query = this.ModelsProvider.Include(m => m.Users);
        }
    }
}