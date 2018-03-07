using Messenger.Core.DAL.Models;
using MongoODM;
using MongoODM.Abstracts;

namespace Messenger.DAL.MongoDB.Context
{
    internal class MongoAppContext : MongoDbContext
    {
        public MongoAppContext(MongoContextSettings settings)
            : base(settings)
        {
        }

        public IModelsProvider<Room> Rooms { get; set; }

        public IModelsProvider<Message> Messages { get; set; }

        public IModelsProvider<User> Users { get; set; }
    }
}