namespace InstaResume.WebSite.Configuration.Interface;

public interface IConfigHelper
{
    AuthenticationConfig GetAuthenticationConfig();
    PdfGeneratorConfig GetPdfGeneratorConfig();
    DatabaseConfig GetDatabaseConfig();
    OpenAiConfig GetOpenAiConfig();
    AWSConfig GetAWSConfig();
}