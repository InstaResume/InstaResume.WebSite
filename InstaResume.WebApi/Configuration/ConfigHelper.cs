using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class ConfigHelper : IConfigHelper
{
    private readonly IConfiguration _configuration;
    private readonly AuthenticationConfig _authenticationConfig;

    public ConfigHelper(IConfiguration configuration)
    {
        _configuration = configuration;
        _authenticationConfig = new AuthenticationConfig();
    }

    public JwtConfig GetJwtConfig()
    {
        var jwtConfig = new JwtConfig();
        _configuration.GetSection(jwtConfig.ConfigKey).Bind(jwtConfig);
        return jwtConfig;
    }
    
    public GoogleAuthConfig GetGoogleAuthConfig()
    {
        if (_authenticationConfig.IsInitialized)
        {
            return _authenticationConfig.Google;
        }
        _configuration.GetSection(_authenticationConfig.ConfigKey).Bind(_authenticationConfig);
        return _authenticationConfig.Google;
    }
}