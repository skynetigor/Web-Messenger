using Messenger.BLL;
using Messenger.Core;
using Microsoft.Extensions.DependencyInjection;

namespace Messenger.IOC
{
    public static class MessengerServiceExtension
    {
        public static IServiceCollection AddMessengerServices(
            this IServiceCollection serviceCollection, DbSettings dbSettings)
        {
            var dalFactory = new DataAccessLayerFactory();
            dalFactory.GetDataAccessLayer(dbSettings).Install(serviceCollection, dbSettings);
            serviceCollection.InstallWebSkype();
            return serviceCollection;
        }
    }
}