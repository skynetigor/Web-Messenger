using System;
using System.IO;
using System.Reflection;
using Microsoft.Extensions.Configuration;

namespace Messenger.WebAPI
{
    public static class Global
    {
        private const string ASPNETCORE_ENVIRONMENT = nameof(ASPNETCORE_ENVIRONMENT);

        public static IConfiguration BuilConfiguration(string[] commandLineArgs)
        {
            var variables = Environment.GetEnvironmentVariables();
            var contentRootPath = GetContentRootPath();

            return new ConfigurationBuilder()
                 .SetBasePath(Path.Combine(contentRootPath, "Configuration"))
                 .AddJsonFile("appsettings.json", optional: false)
                 .AddJsonFile($"appsettings.{variables[ASPNETCORE_ENVIRONMENT]}.json", optional: true)
                 .AddEnvironmentVariables()
                 .AddCommandLine(commandLineArgs)
                 .Build();
        }

        private static string GetContentRootPath()
        {
            var assembly = Assembly.GetEntryAssembly();
            return assembly.Location.Replace($"{assembly.GetName().Name}.dll", string.Empty);
        }
    }
}
