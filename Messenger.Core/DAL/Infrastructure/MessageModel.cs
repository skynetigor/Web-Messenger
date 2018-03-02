using System.Collections.Generic;
using Messenger.Core.DAL.Models;

namespace Messenger.Core.DAL.Infrastructure
{
    public class MessagesResponseModel
    {
        public MessagesResponseModel(int totalPages, int totalMessage, IEnumerable<Message> messages)
        {
            this.TotalPages = totalPages;
            this.Messages = messages;
            this.TotalMessage = totalMessage;
        }

        public int TotalMessage { get; }

        public int TotalPages { get; }

        public IEnumerable<Message> Messages { get; }
    }
}