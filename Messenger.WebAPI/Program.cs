using Microsoft.AspNetCore.Hosting;

namespace Messenger.WebAPI
{
    public class Program
    {
        private const string UrlKey = "url";

        public static void Main(string[] args)
        {
            Global.BuilConfiguration(args);
            var configuration = Global.Configuration;

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
        }
    }
}