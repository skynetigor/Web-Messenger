using System;
using Messenger.Core;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.DAL.Sql.Context;
using Messenger.DAL.Sql.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Messenger.DAL.Sql
{
    public class SqlInstaller : IDataInstaller
    {
        public void Install(IServiceCollection serviceCollection, DbSettings dbSettings)
        {
            Action<DbContextOptionsBuilder> dbTypeAction;

            switch (dbSettings.DbType)
            {
                case DatabaseType.Mysql: dbTypeAction = db => db.UseMySql(dbSettings.ConnectionString); break;
                default: dbTypeAction = db => db.UseSqlServer(dbSettings.ConnectionString); break;
            }

            serviceCollection.AddDbContext<ApplicationContext>(dbTypeAction, ServiceLifetime.Scoped, ServiceLifetime.Singleton);
            serviceCollection.AddScoped<IRepository<Room>, GenericSqlRepository<Room>>();
            serviceCollection.AddScoped<IRepository<User>, UsersSqlRepository>();
            serviceCollection.AddScoped<IMessagesRepository, MessagesSqlRepository>();
        }
    }
}