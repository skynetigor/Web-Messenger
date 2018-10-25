using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Messenger.WebAPI
{
    public class Program
    {
        private const string UrlKey = "url";

        public static void Main(string[] args)
        {
            var configuration = Global.BuilConfiguration(args);

            var url = configuration[UrlKey];

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseConfiguration(configuration)
                .UseUrls(url)
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .Build();

            host.Run();

            HibernatingRhinos.Profiler.Appender.EntityFramework.EntityFrameworkProfiler.Initialize();
        }
    }
}