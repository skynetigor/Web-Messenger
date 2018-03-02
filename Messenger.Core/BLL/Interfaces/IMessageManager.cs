using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;

namespace Messenger.Core.BLL.Interfaces
{
    public interface IMessageManager
    {
        IMessagesRepository Repository { get; }

        void SendMessage(Message message);
    }
}