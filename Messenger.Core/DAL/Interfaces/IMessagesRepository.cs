using Messenger.Core.DAL.Infrastructure;
using Messenger.Core.DAL.Models;

namespace Messenger.Core.DAL.Interfaces
{
    public interface IMessagesRepository : IRepository<Message>
    {
        MessagesResponseModel GetMessages(Room room, int count, int page);
    }
}