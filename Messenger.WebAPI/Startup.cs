using System.IO;
using AutoMapper;
using Messenger.Core;
using Messenger.IOC;
using Messenger.WebAPI.Extensions;
using Messenger.WebAPI.LocalizationManager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Messenger.WebAPI
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(env.ContentRootPath, "Configuration"))
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            this.Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IStringLocalizationManager, StringLocalizationManager>()
                .Configure<DbSettings>(this.Configuration)
                .AddCors()
                .AddJwtAuthentication()
                .AddAutoMapper()
                .AddMessengerServices(this.Configuration)
                .AddSignalR(o => o.Hubs.EnableDetailedErrors = true);
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCustomLogger()
                .UseCustomCors()
                .UseStaticFiles()
                .UseJwtAuthentication()
                .UseSignalR("/api/chathub")
                .UseMvcForAngular();
        }
    }
}