using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class JwtConfig
{
    public string Issuer { get; init; }
    public string Audience { get; init; }
    public string Key { get; init; }
}