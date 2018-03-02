namespace Messenger.Core.DAL.Models
{
    public class User : BaseModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public virtual Room Room { get; set; }
    }
}