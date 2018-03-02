using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;

namespace Messenger.Core.BLL.Interfaces
{
    public interface IRoomsManager
    {
        IRepository<Room> RoomsRepository { get; }

        IRepository<User> UsersRepository { get; }

        Room GetRoomByUser(User user);

        void EnterToRoom(User user, Room room);

        void LiveRoom(User user);

        void CreateRoom(User user, Room room);
    }
}