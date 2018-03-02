using Messenger.WebAPI.AuthOptions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Messenger.WebAPI.Extensions
{
    public static class JwtAuthenticationExtension
    {
        private const string Token = "token";
        private const string Header = "Authorization";

        public static IApplicationBuilder UseJwtAuthentication(this IApplicationBuilder app)
        {
            app.Use(async (ctx, next) =>
            {
                string token = ctx.Request.Query[Token];

                if (!string.IsNullOrWhiteSpace(token))
                {
                    ctx.Request.Headers.Add(Header, new[] { $"Bearer " + token });
                }
                await next();
            });

            app.UseAuthentication();
            return app;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = Options.ISSUER,
                    ValidateAudience = true,
                    ValidAudience = Options.AUDIENCE,
                    IssuerSigningKey = Options.GetSymmetricSecurityKey(),
                    ValidateIssuerSigningKey = true,
                };
            });
            return services;
        }
    }
}