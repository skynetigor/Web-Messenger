using Messenger.BLL;
using Messenger.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Messenger.IOC
{
    public static class MessengerServiceExtension
    {
        public static IServiceCollection AddMessengerServices(
            this IServiceCollection serviceCollection, IConfiguration dbSettings)
        {
            var dalFactory = new DataAccessLayerFactory();
            dalFactory.GetDataAccessLayer(dbSettings).Install(serviceCollection);
            serviceCollection.InstallWebSkype();
            return serviceCollection;
        }
    }
}