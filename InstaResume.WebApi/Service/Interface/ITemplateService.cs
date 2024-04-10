using InstaResume.WebSite.Model;

namespace InstaResume.WebSite.Service.Interface;

public interface ITemplateService
{
    Task<List<TemplateData>> GetTemplates();
    Task<string> GetTemplateSource(string id);
    Task UploadFileToS3Async(Stream fileStream);
    Task<Stream> DownloadFileFromS3Async(string keyName);
    Task<Stream> DownloadExampleTemplateFile();
}