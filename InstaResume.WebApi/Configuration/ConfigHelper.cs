using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class ConfigHelper : IConfigHelper
{
    private readonly IConfiguration _configuration;

    public ConfigHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public JwtConfig GetJwtConfig()
    {
        var jwtConfig = new JwtConfig();
        _configuration.GetSection(jwtConfig.ConfigKey).Bind(jwtConfig);
        return jwtConfig;
    }
}