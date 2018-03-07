using Messenger.Core;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.DAL.MongoDB.Context;
using Messenger.DAL.MongoDB.Repositories;
using Microsoft.Extensions.DependencyInjection;
using MongoODM;

namespace Messenger.DAL.MongoDB
{
    public class MongoDbInstaller : IDataInstaller
    {
        public void Install(IServiceCollection serviceCollection, DbSettings dbSettings)
        {
            serviceCollection.AddSingleton<MongoContextSettings>(new MongoContextSettings(dbSettings.ConnectionString));
            var contextType = typeof(MongoAppContext);
            serviceCollection.Add(new ServiceDescriptor(contextType, contextType, ServiceLifetime.Scoped));
            serviceCollection.AddScoped<IRepository<Room>, RoomsMongoRepository>();
            serviceCollection.AddScoped<IRepository<User>, UsersMongoRepository>();
            serviceCollection.AddScoped<IMessagesRepository, MessagesMongoRepository>();
        }
    }
}