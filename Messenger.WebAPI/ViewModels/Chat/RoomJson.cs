using Newtonsoft.Json;

namespace Messenger.WebAPI.ViewModels.Chat
{
    public class RoomJson
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}