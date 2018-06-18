using Messenger.Core.DAL.Models;
using Messenger.WebAPI.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.WebAPI.Controllers
{
    public class AbstractChatController : Controller
    {
        private User _currentUser;
        protected User CurrentUser => this._currentUser ?? (this._currentUser = this.HttpContext.User.GetUser());
    }
}
