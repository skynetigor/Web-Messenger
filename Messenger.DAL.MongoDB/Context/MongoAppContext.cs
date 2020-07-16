<<<<<<< Updated upstream
﻿using Messenger.Core.DAL.Models;
using MongoORM;
using MongoORM.Abstracts;
=======
﻿using System;
using DocDb.Core;
using DocDb.Core.Abstracts;
using DocDb.Mongo.Settings;
using Messenger.Core.DAL.Models;
>>>>>>> Stashed changes

namespace Messenger.DAL.MongoDB.Context
{
    internal class MongoAppContext : MongoDbContext
    {
<<<<<<< Updated upstream
        public MongoAppContext(MongoContextSettings settings)
            : base(settings)
=======
        public MongoAppContext(Action<DocumentDbOptionsBuilder> builderAction)
            : base(builderAction)
>>>>>>> Stashed changes
        {
        }

        public IModelsProvider<Room> Rooms { get; set; }

        public IModelsProvider<Message> Messages { get; set; }

        public IModelsProvider<User> Users { get; set; }
    }
}