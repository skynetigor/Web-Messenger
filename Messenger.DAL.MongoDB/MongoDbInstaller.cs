<<<<<<< Updated upstream
﻿using Messenger.Core;
=======
﻿using DocDb.Core.Extensions;
using DocDb.Mongo.Extensions;
using Messenger.Core;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            serviceCollection.AddSingleton<MongoContextSettings>(new MongoContextSettings(dbSettings.ConnectionString));
            var contextType = typeof(MongoAppContext);
            serviceCollection.Add(new ServiceDescriptor(contextType, contextType, ServiceLifetime.Scoped));
=======
            serviceCollection.AddDocumentDbContext<MongoAppContext>(b => b.UseMongoDb(dbSettings.ConnectionString), ServiceLifetime.Scoped);
>>>>>>> Stashed changes
            serviceCollection.AddScoped<IRepository<Room>, RoomsMongoRepository>();
            serviceCollection.AddScoped<IRepository<User>, UsersMongoRepository>();
            serviceCollection.AddScoped<IMessagesRepository, MessagesMongoRepository>();
        }
    }
}