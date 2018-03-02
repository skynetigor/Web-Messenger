using Newtonsoft.Json;

namespace Messenger.WebAPI.ViewModels.Chat
{
    public class UserJson
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("userName")]
        public string UserName { get; set; }
    }
}