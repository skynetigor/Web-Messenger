using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Messenger.Core.DAL.Models;

namespace Messenger.WebAPI.Extensions
{
    public static class IdentityExtension
    {
        private const string ClaimId = "ID";

        private static User GetFromPrincipalUser(ClaimsPrincipal user)
        {
            var claim = user.Claims.FirstOrDefault(t => t.Type == ClaimId);
            string id = string.Empty;
            if (claim != null)
            {
                id = claim.Value;
            }

            return new User { Id = id, UserName = user.Identity.Name };
        }

        public static User GetUser(this ClaimsPrincipal user)
        {
            return GetFromPrincipalUser(user);
        }

        public static User GetUser(this IPrincipal user)
        {
            return GetFromPrincipalUser((ClaimsPrincipal)user);
        }
    }
}