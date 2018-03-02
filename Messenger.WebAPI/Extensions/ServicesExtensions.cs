using System;
using Messenger.Core;
using Messenger.IOC;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Messenger.WebAPI.Extensions
{
    public static class ServicesExtensions
    {
        private const string ServerMsg = "Application running on \"{0}\" database. \n";

        public static IServiceCollection AddMessengerServices(this IServiceCollection services, IConfigurationRoot configuration)
        {
            var dbSet = configuration.GetSection("DbSettings");
            var dbsettings = new DbSettings(Enum.Parse<DatabaseType>(dbSet["dbType"], true), dbSet["connectionString"]);
            Console.WriteLine(ServerMsg, dbsettings.DbType);
            services.AddMessengerServices(dbsettings);
            return services;
        }
    }
}
