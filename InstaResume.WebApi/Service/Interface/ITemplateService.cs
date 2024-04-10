namespace InstaResume.WebSite.Service.Interface;

public interface ITemplateService
{
    Task UploadFileToS3Async(Stream fileStream);
}