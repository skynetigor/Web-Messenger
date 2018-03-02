using System.Collections.Generic;

namespace Messenger.WebAPI.LocalizationManager
{
    public interface IStringLocalizationManager
    {
        IEnumerable<string> AvailableLangs { get; }

        IDictionary<string, string> GetLocale(string code);

        string GetLocaleJsonString(string code);
    }
}