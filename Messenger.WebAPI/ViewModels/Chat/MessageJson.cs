using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Messenger.WebAPI.ViewModels.Chat
{
    public class MessageJson
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("date")]
        public string Date { get; set; }
    }
}