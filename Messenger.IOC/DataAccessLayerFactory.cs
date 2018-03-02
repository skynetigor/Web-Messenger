using Messenger.Core;
using Messenger.Core.DAL.Interfaces;
using Messenger.DAL.MongoDB;
using Messenger.DAL.Sql;

namespace Messenger.IOC
{
    internal class DataAccessLayerFactory
    {
        public IDataInstaller GetDataAccessLayer(DbSettings dbSettings)
        {
            switch (dbSettings.DbType)
            {
                case DatabaseType.Mongodb: return new MongoDbInstaller();
                default: return new SqlInstaller();
            }
        }
    }
}