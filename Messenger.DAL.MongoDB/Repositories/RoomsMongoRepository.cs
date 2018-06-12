using Messenger.Core.DAL.Models;
using Messenger.DAL.MongoDB.Context;

namespace Messenger.DAL.MongoDB.Repositories
{
    internal class RoomsMongoRepository : GenericMongoRepository<Room>
    {
        public RoomsMongoRepository(MongoAppContext context)
            : base(context)
        {
<<<<<<< Updated upstream
            this.Query = this.ModelsProvider.Include(m => m.Users);
=======
            this.Query = this.ModelsProvider.UseLazyLoading().Include(m => m.Users);
>>>>>>> Stashed changes
        }
    }
}