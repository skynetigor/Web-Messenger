using Microsoft.AspNetCore.Mvc;

namespace Messenger.WebAPI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return this.View();
        }
    }
}