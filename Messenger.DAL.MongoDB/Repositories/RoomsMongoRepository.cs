using System.Linq;
using Messenger.Core.DAL.Models;
using Messenger.DAL.MongoDB.Context;

namespace Messenger.DAL.MongoDB.Repositories
{
    internal class RoomsMongoRepository : GenericMongoRepository<Room>
    {
        protected override IQueryable<Room> Query { get; }

        public RoomsMongoRepository(MongoAppContext context)
            : base(context)
        {
            this.Query = this.ModelsProvider.UseEagerLoading().Include(m => m.Users);
        }
    }
}