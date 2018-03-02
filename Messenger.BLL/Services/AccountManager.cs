using System.Linq;
using Messenger.Core.BLL.Interfaces;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.Core.Infrastructure.Account;

namespace Messenger.BLL.Services
{
    public class AccountManager : IAccountManager
    {
        private IRepository<User> userRepository;

        public AccountManager(IRepository<User> userRepository)
        {
            this.userRepository = userRepository;
        }

        public IRepository<User> Repository
        {
            get { return this.userRepository; }
        }

        public SignInStatus SignIn(User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.UserName))
            {
                return SignInStatus.InvalidModel;
            }

            var existinUser = this.userRepository.GetEntities().FirstOrDefault(u => u.UserName == user.UserName && u.Password == user.Password);

            if (existinUser != null)
            {
                user.Id = existinUser.Id;
                return SignInStatus.Success;
            }

            return SignInStatus.UserNotFound;
        }

        public RegistrationStatus Create(User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.UserName))
            {
                return RegistrationStatus.InvalidModel;
            }

            var existingUser = this.userRepository.GetEntities().FirstOrDefault(u => u.UserName == user.UserName);

            if (existingUser == null)
            {
                this.userRepository.Add(user);
                return RegistrationStatus.Success;
            }

            return RegistrationStatus.UserAlreadyExist;
        }
    }
}