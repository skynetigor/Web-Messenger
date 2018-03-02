using AutoMapper;
using Messenger.Core.DAL.Models;
using Messenger.WebAPI.ViewModels.Chat;

namespace Messenger.WebAPI.AutomapperProfiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            this.CreateMap<Message, MessageJson>().ConstructProjectionUsing(m => new MessageJson
            {
                UserName = m.User.UserName,
            });
            this.CreateMap<Room, RoomJson>();
            this.CreateMap<User, UserJson>();
        }
    }
}