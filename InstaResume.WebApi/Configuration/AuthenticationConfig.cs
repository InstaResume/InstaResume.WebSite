using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class AuthenticationConfig : IConfig
{
    public string ConfigKey { get; init; } = "Authentication";
    public bool IsInitialized { get; set; } = false;
    public GoogleAuthConfig Google { get; set; }
    public JwtConfig Jwt { get; set; }
}