namespace InstaResume.WebSite.Configuration.Interface;

public class GoogleOAuthConfig : IConfig
{
    public string ConfigKey { get; init; } = "GoogleOAuth";
    public bool IsInitialized { get; set; } = false;
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
}