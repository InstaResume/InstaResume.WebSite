namespace InstaResume.WebSite.Configuration.Interface;

public interface IConfig
{
    public string ConfigKey { get; init; }
    public bool IsInitialized { get; set; }
}