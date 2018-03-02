using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Messenger.WebAPI.AuthOptions
{
    public static class Options
    {
        public const string ISSUER = "WebChat"; // издатель токена
        public const string AUDIENCE = "Client"; // потребитель токена
        private const string KEY = "mysupersecret_secretkey!1702";   // ключ для шифрации
        public const int LIFETIME = 7; // время жизни токена - 1 минута

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}