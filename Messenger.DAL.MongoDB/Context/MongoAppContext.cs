using Messenger.Core.DAL.Models;
using MongoORM;
using MongoORM.Abstracts;

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