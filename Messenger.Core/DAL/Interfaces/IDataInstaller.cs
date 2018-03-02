using Microsoft.Extensions.DependencyInjection;

namespace Messenger.Core.DAL.Interfaces
{
    public interface IDataInstaller
    {
        void Install(IServiceCollection serviceCollection, DbSettings dbSettings);
    }
}