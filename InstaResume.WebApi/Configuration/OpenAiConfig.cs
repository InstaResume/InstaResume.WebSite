using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class OpenAiConfig : IConfig
{
    public string ConfigKey { get; init; } = "OpenAi";
    public bool IsInitialized { get; set; } = false;
    public string ApiKey { get; init; }
}