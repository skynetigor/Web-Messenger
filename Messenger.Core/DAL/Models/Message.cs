namespace Messenger.Core.DAL.Models
{
    public class Message : BaseModel
    {
        public string Text { get; set; }

        public string Date { get; set; }

        public virtual User User { get; set; }

        public virtual Room Room { get; set; }
    }
}