using System.Linq;
using System.Text.RegularExpressions;
using Messenger.Core.BLL.Interfaces;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;

namespace Messenger.BLL.Services
{
    public class RoomsManager : IRoomsManager
    {
        private IRepository<Room> roomsRepository;
        private IRepository<User> usersRepository;

        public RoomsManager(IRepository<Room> roomsRepository, IRepository<User> usersRepository)
        {
            this.roomsRepository = roomsRepository;
            this.usersRepository = usersRepository;
        }

        public IRepository<Room> RoomsRepository
        {
            get { return this.roomsRepository; }
        }

        public IRepository<User> UsersRepository
        {
            get { return this.usersRepository; }
        }

        public void CreateRoom(User user, Room room)
        {
            var currentRoom = user.Room;
            if (currentRoom != null)
            {
                currentRoom.Users.Remove(user);
                this.roomsRepository.Update(currentRoom);
            }

            var appRoom = this.roomsRepository.GetEntities().FirstOrDefault(r => r.Name == room.Name);
            if (appRoom != null)
            {
                var count = this.roomsRepository
                    .GetEntities()
                    .Where(r => this.RoomMatches(room, r))
                    .Count() + 1;
                room.Name += $" ({count})";
            }

            this.roomsRepository.Add(room);
            user.Room = room;
            room.Users = new[] { user };
            this.usersRepository.Update(user);
        }

        public void EnterToRoom(User user, Room room)
        {
            var currentRoom = user.Room;

            if (currentRoom != null && room.Id != currentRoom.Id)
            {
                currentRoom.Users.Remove(user);
                this.roomsRepository.Update(currentRoom);
            }

            if (currentRoom == null || room.Id != currentRoom.Id)
            {
                room.Users.Add(user);
                this.roomsRepository.Update(room);
            }

            room.Users = this.usersRepository.GetEntities(u => u.Room != null && u.Room.Id == room.Id).ToList();
        }

        public Room GetRoomByUser(User user)
        {
            var appUser = this.usersRepository.GetEntities().FirstOrDefault(u => u.Id == user.Id);
            return appUser.Room;
        }

        public void LiveRoom(User user)
        {
            var room = user.Room;
            if (room != null)
            {
                user.Room = null;
                this.usersRepository.Update(user);
            }
        }

        private bool RoomMatches(Room comparable, Room current)
        {
            if (comparable.Name == current.Name)
            {
                return true;
            }

            var r = comparable.Name.Trim();
            var m = current.Name.Trim();
            var regex = new Regex(r);
            var match = regex.Match(m);
            return match.Success;
        }
    }
}