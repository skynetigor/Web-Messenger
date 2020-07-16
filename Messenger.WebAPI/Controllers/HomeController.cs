using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.WebAPI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment hostingEnvironment;

        public HomeController(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Index()
        {
            string path = Path.Combine(hostingEnvironment.WebRootPath, "index.html");

            return File(new FileStream(path, FileMode.Open), "text/html");
        }
    }
}