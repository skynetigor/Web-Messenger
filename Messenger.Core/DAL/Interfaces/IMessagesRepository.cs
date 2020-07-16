using Messenger.Core.DAL.Infrastructure;
using Messenger.Core.DAL.Models;

namespace Messenger.Core.DAL.Interfaces
{
    public interface IMessagesRepository : IRepository<Message>
    {
        MessagesResponseModel GetMessages(string roomId, int count, int page);
    }
}