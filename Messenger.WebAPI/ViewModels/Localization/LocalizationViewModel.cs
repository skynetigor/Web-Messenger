using System.Collections.Generic;

namespace Messenger.WebAPI.ViewModels.Localization
{
    public class LocalizationViewModel
    {
        public IEnumerable<string> Langs { get; set; }

        public string CurrentLangJson { get; set; }
    }
}