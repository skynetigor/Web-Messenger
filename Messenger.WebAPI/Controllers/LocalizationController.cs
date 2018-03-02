using Messenger.WebAPI.LocalizationManager;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.WebAPI.Controllers
{
    [Produces("application/json")]
    public class LocalizationController : Controller
    {
        private const string LocalizationNotFound = "Localization not found";
        private IStringLocalizationManager localizationManager;

        public LocalizationController(IStringLocalizationManager localizationManager)
        {
            this.localizationManager = localizationManager;
        }

        [HttpPost]
        public IActionResult Lang(string code)
        {
            var value = this.localizationManager.GetLocaleJsonString(code);
            if (value != null)
            {
                return this.BadRequest(LocalizationNotFound);
            }

            return this.Content(value);
        }

        [HttpPost]
        public IActionResult AvailableLangs()
        {
            return null;
        }
    }
}