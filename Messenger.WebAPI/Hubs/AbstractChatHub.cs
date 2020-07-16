using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Messenger.Core.BLL.Interfaces;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.WebAPI.Abstracts;
using Messenger.WebAPI.Extensions;
using Messenger.WebAPI.ViewModels.Chat;
using Microsoft.AspNetCore.SignalR;

namespace Messenger.WebAPI.Hubs
{
    public abstract class AbstractChatHub : Hub
    {
        private const string Joined = "User {0} enter to room.";
        private const string Live = "User {0} live room.";
        private const string RoomID = "roomId=";

        private IRoomsManager roomsManager;
        private User currentUser;
        private IMapper mapper;
        private IRepository<Room> roomRepository;
        private IRepository<User> usersRepository;
        private IMessageManager messageManager;

        protected User CurrentUser
        {
            
            get { return this.currentUser ?? (this.currentUser = this.Context.User.GetUser()); }
        }

        protected IRoomsManager RoomsManager
        {
            get
            {
                return this.roomsManager;
            }
        }

        protected IMessageManager MessageManager
        {
            get
            {
                return this.messageManager;
            }
        }

        protected IMapper Mapper
        {
            get
            {
                return this.mapper;
            }
        }

        protected IRepository<Room> RoomRepository
        {
            get { return this.roomRepository; }
        }

        protected IRepository<User> UsersRepository
        {
            get { return this.usersRepository; }
        }

        public AbstractChatHub(
            IRoomsManager roomsManager,
            IMapper mapper,
            IMessageManager messageManager)
        {
            this.roomsManager = roomsManager;
            this.mapper = mapper;
            this.roomRepository = roomsManager.RoomsRepository;
            this.usersRepository = roomsManager.UsersRepository;
            this.messageManager = messageManager;
        }

        protected virtual void OnGetMessage(Room room, MessageJson message)
        {
            this.Clients.OthersInGroup(this.GetGroup(room.Id)).onGetMessage(message);
        }

        protected virtual void OnRoomsCountChange(IEnumerable<RoomJson> rooms)
        {
            this.Clients.All.onRoomsCountChange(rooms);
        }

        protected virtual void OnUserJoined(Room room)
        {
            var message = string.Format(Joined, this.CurrentUser.UserName);
            this.Clients.OthersInGroup(this.GetGroup(room.Id)).onUserJoined(message);
        }

        protected virtual void OnUserLive(Room room)
        {
            var message = string.Format(Live, this.CurrentUser.UserName);
            this.Clients.OthersInGroup(this.GetGroup(room.Id)).userLiveRoom(message);
        }

        protected virtual void OnUserCountChanged(Room room)
        {
            var users = room.Users;
            var usersJson = this.mapper.Map<IEnumerable<User>, IEnumerable<UserJson>>(users);
            this.Clients.Group(this.GetGroup(room.Id)).onUserCountChanged(usersJson);
        }

        protected virtual void OnUserWriting(string roomId)
        {
            var user = this.Mapper.Map<User, UserJson>(this.CurrentUser);
            this.Clients.OthersInGroup(this.GetGroup(roomId)).onUserWriting(user);
        }

        protected virtual string GetGroup(string id)
        {
            return string.Concat(id, RoomID);
        }

        protected virtual void AddToGroup(string id)
        {
            this.Groups.Add(this.Context.ConnectionId, this.GetGroup(id));
        }

        protected virtual void RemoveFromGroup(string id)
        {
            this.Groups.Remove(this.Context.ConnectionId, this.GetGroup(id));
        }

#pragma warning disable Nix08, Nix09
        public override Task OnDisconnected(bool stopCalled)
        {
            // var task = Task.Run(action: () =>
            // {
            //    var user = this.UsersRepository
            //    .GetById(this.CurrentUser.Id);
            //    if (user != null)
            //    {
            //        var currentRoom = user.Room;
            //        this.RoomsManager.LiveRoom(user);
            //        this.OnUserCountChanged(currentRoom);
            //    }
            // });
            return base.OnDisconnected(stopCalled);
        }
    }
}