using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class AuthenticationConfig : IConfig
{
    public string ConfigKey { get; init; }
    public bool IsInitialized { get; set; }
    public GoogleAuthConfig Google { get; set; }
    public JwtConfig Jwt { get; set; }
}