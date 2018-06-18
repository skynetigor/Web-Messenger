using System.Collections.Generic;
using Messenger.Core.DAL.Models;
using Messenger.WebAPI.ViewModels.Chat;

namespace Messenger.WebAPI.Abstracts
{
    public interface IChatHub
    {
        void OnGetMessage(Room room, MessageJson message);

        void OnRoomsCountChange(IEnumerable<RoomJson> rooms);

        void OnUserJoined(Room room);

        void OnUserLive(Room room);

        void OnUserCountChanged(Room room);

        void OnUserWriting(string roomId);

        string GetGroup(string id);

        void AddToGroup(string id);

        void RemoveFromGroup(string id);
    }
}
