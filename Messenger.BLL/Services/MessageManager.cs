using Messenger.Core.BLL.Interfaces;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;

namespace Messenger.BLL.Services
{
    public class MessageManager : IMessageManager
    {
        private IMessagesRepository repository;

        public MessageManager(IMessagesRepository repository)
        {
            this.repository = repository;
        }

        public IMessagesRepository Repository
        {
            get { return this.repository; }
        }

        public void SendMessage(Message message)
        {
            this.repository.Add(message);
        }
    }
}