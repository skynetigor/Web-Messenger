using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace Messenger.WebAPI.LocalizationManager
{
    public class StringLocalizationManager : IStringLocalizationManager
    {
        private const string Path = @"Resources\localization\";

        public IEnumerable<string> AvailableLangs
        {
            get
            {
               return Directory.GetFiles(Path, "*.json");
            }
        }

        public IDictionary<string, string> GetLocale(string code)
        {
            var file = Path + code + ".json";
            if (File.Exists(file))
            {
                var value = File.ReadAllText(file);
                var dictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(value);
                return dictionary;
            }

            return null;
        }

        public string GetLocaleJsonString(string code)
        {
            var file = Path + code + ".json";
            if (File.Exists(file))
            {
                var value = File.ReadAllText(file);
                return value;
            }

            return null;
        }
    }
}