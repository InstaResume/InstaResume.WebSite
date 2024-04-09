using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class DatabaseConfig : IConfig
{
    public string ConfigKey { get; init; } = "DatabaseConfiguration";
    public bool IsInitialized { get; set; } = false;
    public string MongoConnectionString { get; set; }
}