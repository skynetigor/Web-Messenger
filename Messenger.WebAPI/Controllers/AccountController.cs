using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Messenger.Core.BLL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.Core.Infrastructure.Account;
using Messenger.WebAPI.AuthOptions;
using Messenger.WebAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Messenger.WebAPI.Controllers
{
    [Produces("application/json")]
    public class AccountController : Controller
    {
        private const string ClaimId = "ID";
        private const string WrongLogin = "Wrong password or login";
        private const string UserAlreadyExist = "User \"{0}\" is already exist";

        private IAccountManager accountManager;

        public AccountController(IAccountManager accountManager)
        {
            this.accountManager = accountManager;
        }

        [HttpPost]
        public IActionResult Register([FromBody]RegisterViewModel model)
        {
            if (this.ModelState.IsValid)
            {
                var user = new User
                {
                    UserName = model.UserName,
                    Password = model.Password
                };
                var isAuth = this.accountManager.Create(user);

                switch (isAuth)
                {
                    case RegistrationStatus.Success: return this.Json(this.CreateToken(user));
                    case RegistrationStatus.UserAlreadyExist:
                        var error = string.Format(UserAlreadyExist, model.UserName);
                        this.ModelState.AddModelError("errors", error);
                        break;
                }
            }

            return this.BadRequest(this.ModelState);
        }

        [HttpPost]
        public IActionResult SignIn([FromBody]LoginViewModel model)
        {
            if (this.ModelState.IsValid)
            {
                var user = new User
                {
                    UserName = model.UserName,
                    Password = model.Password
                };
                var isAuth = this.accountManager.SignIn(user);

                switch (isAuth)
                {
                    case SignInStatus.Success: return this.Json(this.CreateToken(user));
                    case SignInStatus.UserNotFound:
                        this.ModelState.AddModelError("errors", WrongLogin);
                        break;
                }
            }

            return this.BadRequest(this.ModelState);
        }

        [HttpGet]
        public IActionResult CheckUser([FromQuery]string userId, string userName)
        {
            User existingUser = this.accountManager.Repository.GetById(userId);
            if (existingUser != null && existingUser.UserName == userName)
            {
                return this.Ok();
            }

            return this.Unauthorized();
        }

        private object CreateToken(User user)
        {
            var identity = this.GetIdentity(user);
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: Options.ISSUER,
                    audience: Options.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromDays(Options.LIFETIME)),
                    signingCredentials: new SigningCredentials(Options.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return new
            {
                token = encodedJwt,
                id = user.Id,
                userName = user.UserName
            };
        }

        private ClaimsIdentity GetIdentity(User user)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
                    new Claim(ClaimId, user.Id.ToString()),
                };
            ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(
                claims,
                "Token",
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}