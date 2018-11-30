using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Messenger.Core.DAL.Interfaces
{
    public interface IDataInstaller
    {
        void Install(IServiceCollection serviceCollection);
    }
}