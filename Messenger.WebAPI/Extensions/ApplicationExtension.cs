using System;
using Microsoft.AspNetCore.Builder;

namespace Messenger.WebAPI.Extensions
{
    public static class ApplicationExtension
    {
        public static IApplicationBuilder UseCustomLogger(this IApplicationBuilder app)
        {
            app.Use(async (ctx, next) =>
            {
                try
                {
                    await next();
                }
                catch (Exception e)
                {
                    Console.WriteLine();
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine(e.Message);
                    Console.WriteLine();
                    Console.ResetColor();
                }
            });
            return app;
        }

        public static IApplicationBuilder UseCustomCors(this IApplicationBuilder app)
        {
            app.UseCors(policy =>
            {
                policy.WithOrigins("*");
                policy.AllowAnyHeader();
                policy.AllowAnyMethod();
                policy.AllowCredentials();
                policy.AllowAnyOrigin();
            });
            return app;
        }

        public static IApplicationBuilder UseMvcForAngular(this IApplicationBuilder app)
        {
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "index",
                    template: string.Empty,
                    defaults: new { controller = "Home", action = "Index" });
                routes.MapRoute(
                    name: "default",
                    template: "api/{controller}/{action}");
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
            return app;
        }
    }
}
