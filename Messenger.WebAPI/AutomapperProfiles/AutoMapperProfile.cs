using AutoMapper;
using Messenger.Core.DAL.Models;
using Messenger.WebAPI.ViewModels.Chat;

namespace Messenger.WebAPI.AutomapperProfiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            this.CreateMap<Message, MessageJson>().ProjectUsing(m => new MessageJson
            {
                UserName = m.User.UserName,
                Date = m.Date.ToString("HH:mm"),
                Text = m.Text
            });
            this.CreateMap<Room, RoomJson>();
            this.CreateMap<User, UserJson>();
        }
    }
}