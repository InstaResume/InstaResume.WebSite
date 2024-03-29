using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class GoogleAuthConfig : IConfig
{
    public string ConfigKey { get; init; } = "GoogleOAuth";
    public bool IsInitialized { get; set; } = false;
    public string ClientId { get; init; }
    public string ClientSecret { get; init; }
}