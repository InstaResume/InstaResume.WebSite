using InstaResume.WebSite.Configuration.Interface;

namespace InstaResume.WebSite.Configuration;

public class PdfGeneratorConfig : IConfig
{
    public string ConfigKey { get; init; } = "PdfGenerator";
    public bool IsInitialized { get; set; } = false;
    public string Url { get; set; }
}