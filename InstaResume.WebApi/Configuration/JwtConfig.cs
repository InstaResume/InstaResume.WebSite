using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class JwtConfig : IConfig
{
    public string ConfigKey { get; init; } = "Jwt";
    public bool IsInitialized { get; set; } = false;
    public string Issuer { get; init; }
    public string Audience { get; init; }
    public string Key { get; init; }
}