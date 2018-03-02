using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.Core.Infrastructure.Account;

namespace Messenger.Core.BLL.Interfaces
{
    public interface IAccountManager
    {
        IRepository<User> Repository { get; }

        RegistrationStatus Create(User user);

        SignInStatus SignIn(User user);
    }
}