using Messenger.BLL.Services;
using Messenger.Core.BLL.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Messenger.BLL
{
    public static class BLLExtension
    {
        public static void InstallWebSkype(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IMessageManager, MessageManager>();
            serviceCollection.AddScoped<IAccountManager, AccountManager>();
            serviceCollection.AddScoped<IRoomsManager, RoomsManager>();
        }
    }
}