namespace InstaResume.WebSite.Service.Interface;

public interface ITemplateService
{
    Task UploadFileToS3Async(Stream fileStream);
    Task<Stream> DownloadFileFromS3Async(string keyName);
    Task<Stream> DownloadExampleTemplateFile();
}