using System.Collections.Generic;

namespace Messenger.WebAPI.ViewModels.Chat
{
    public class MessagesJsonResponseModel
    {
        public IEnumerable<MessageJson> Messages { get; set; }

        public int TotalPages { get; set; }

        public int TotalMessages { get; set; }
    }
}
