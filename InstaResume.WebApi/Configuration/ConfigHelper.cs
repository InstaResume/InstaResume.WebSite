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
    
    public AuthenticationConfig GetAuthenticationConfig()
    {
        if (_authenticationConfig.IsInitialized)
        {
            return _authenticationConfig;
        }
        _configuration.GetSection(_authenticationConfig.ConfigKey).Bind(_authenticationConfig);
        return _authenticationConfig;
    }
    
    public PdfGeneratorConfig GetPdfGeneratorConfig()
    {
        var pdfGeneratorConfig = new PdfGeneratorConfig();
        _configuration.GetSection(pdfGeneratorConfig.ConfigKey).Bind(pdfGeneratorConfig);
        return pdfGeneratorConfig;
    }
    
    public DatabaseConfig GetDatabaseConfig()
    {
        var mongoDbConfig = new DatabaseConfig();
        _configuration.GetSection(mongoDbConfig.ConfigKey).Bind(mongoDbConfig);
        return mongoDbConfig;
    }
    
    public OpenAiConfig GetOpenAiConfig()
    {
        var openAiConfig = new OpenAiConfig
        {
            ApiKey = Environment.GetEnvironmentVariable("OPENAI_KEY") ?? ""
        };
        return openAiConfig;
    }
    
    public AWSConfig GetAWSConfig()
    {
        var awsConfig = new AWSConfig
        {
            AccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY") ?? "",
            SecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_KEY") ?? "",
        };
        return awsConfig;
    }
}