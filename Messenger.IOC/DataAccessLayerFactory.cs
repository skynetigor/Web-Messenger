using System;
using Messenger.Core;
using Messenger.Core.DAL.Interfaces;
using Messenger.DAL.Sql;
using Microsoft.Extensions.Configuration;

namespace Messenger.IOC
{
    internal class DataAccessLayerFactory
    {
        private const string ServerMsg = "Application is running on \"{0}\" database. \n";

        public IDataInstaller GetDataAccessLayer(IConfiguration configuration)
        {
            var dbSet = configuration.GetSection("DbSettings");
            var dbsettings = new DbSettings((DatabaseType) Enum.Parse(typeof(DatabaseType), dbSet["dbType"], true), dbSet["connectionString"]);
            Console.WriteLine(ServerMsg, dbsettings.DbType);

            switch (dbsettings.DbType)
            {
                //case DatabaseType.Mongodb: return new MongoDbInstaller();
                default: return new SqlInstaller(dbsettings);
            }
        }
    }
}