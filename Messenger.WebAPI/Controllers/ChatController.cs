using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Messenger.Core.DAL.Infrastructure;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.WebAPI.ViewModels.Chat;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.WebAPI.Controllers
{
    [Produces("application/json")]
    public class ChatController : Controller
    {
        private IRepository<Room> roomRepository;
        private IMessagesRepository messagesRepository;
        private IMapper mapper;

        public ChatController(IMapper mapper, IRepository<Room> roomRepository, IMessagesRepository messagesRepository)
        {
            this.mapper = mapper;
            this.roomRepository = roomRepository;
            this.messagesRepository = messagesRepository;
        }

        [HttpGet]
        public IActionResult GetRooms()
        {
            var rooms = this.roomRepository.GetEntities().ToArray();
            var roomsJson = this.mapper.Map<IEnumerable<Room>, IEnumerable<RoomJson>>(rooms);
            return this.Json(roomsJson);
        }

        [HttpGet]
        public IActionResult GetMessages(string roomId, int messageCount, int messagePage)
        {
            var model = this.messagesRepository.GetMessages(roomId, messageCount, messagePage);

            var messagesJson = this.mapper
                .Map<MessagesResponseModel, MessagesJsonResponseModel>(model);
        
            return Json(messagesJson);
        }
    }
}