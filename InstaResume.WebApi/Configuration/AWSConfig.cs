using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class AWSConfig : IConfig
{
    public string ConfigKey { get; init; } = "AWS";
    public bool IsInitialized { get; set; } = false;
    public string AccessKey { get; set; }
    public string SecretKey { get; set; }
}