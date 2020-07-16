using System;
using Messenger.Core;
using Messenger.DAL.Sql.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Messenger.DAL.Sql
{
    class DbContextFactory : IDesignTimeDbContextFactory<ApplicationContext>
    {
        public ApplicationContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .AddEnvironmentVariables().Build();

            var dbSet = configuration.GetSection("DbSettings");
            var dbsettings = new DbSettings((DatabaseType)Enum.Parse(typeof(DatabaseType), dbSet["dbType"], true), dbSet["connectionString"]);

            Action<DbContextOptionsBuilder> dbTypeAction;

            switch (dbsettings.DbType)
            {
                case DatabaseType.Mysql: dbTypeAction = db => db.UseMySql(dbsettings.ConnectionString); break;
                default: dbTypeAction = db => db.UseSqlServer(dbsettings.ConnectionString); break;
            }

            var dbContextOptionsBuilder = new DbContextOptionsBuilder();

            dbTypeAction(dbContextOptionsBuilder);

            return new ApplicationContext(dbContextOptionsBuilder.Options);
        }
    }
}
