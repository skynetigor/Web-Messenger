using DbdocFramework;
using DbdocFramework.Abstracts;
using DbdocFramework.MongoDbProvider.Settings;
using Messenger.Core.DAL.Models;

namespace Messenger.DAL.MongoDB.Context
{
    internal class MongoAppContext : DocumentDbContext
    {
        public MongoAppContext(MongoDbContextSettings settings)
            : base(settings)
        {
        }

        public IDbSet<Room> Rooms { get; set; }

        public IDbSet<Message> Messages { get; set; }

        public IDbSet<User> Users { get; set; }
    }
}