using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Messenger.WebAPI
{
    public class Program
    {
        private const string UrlKey = "url";
        private const string HostingJson = "hosting.json";

        public static void Main(string[] args)
        {
            var contentRootPath = Directory.GetCurrentDirectory();
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(contentRootPath, "Configuration"))
                .AddJsonFile(HostingJson)
                .AddCommandLine(args)
                .Build();

            var url = configuration[UrlKey];

            var host = new WebHostBuilder()
                .UseKestrel().UseUrls(url)
                .UseContentRoot(contentRootPath)
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .Build();

            host.Run();

            HibernatingRhinos.Profiler.Appender.EntityFramework.EntityFrameworkProfiler.Initialize();
        }
    }
}