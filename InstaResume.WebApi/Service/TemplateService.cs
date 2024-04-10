using InstaResume.WebSite.ConnectionProvider.Interface;
using InstaResume.WebSite.Model;
using InstaResume.WebSite.Repository.Interface;
using InstaResume.WebSite.Service.Interface;

namespace InstaResume.WebSite.Service;

public class TemplateService : ITemplateService
{
    private IS3ConnectionProvider _s3ConnectionProvider;
    private ITemplateRepository _templateRepository;
    private string _bucketName = "instaresume-deployment-settings";

    public TemplateService(IS3ConnectionProvider s3ConnectionProvider, ITemplateRepository templateRepository)
    {
        _s3ConnectionProvider = s3ConnectionProvider;
        _templateRepository = templateRepository;
    }
    
    public async Task UploadFileToS3Async(Stream fileStream)
    {
        var fileName = Guid.NewGuid().ToString();
        await _s3ConnectionProvider.UploadFileToS3Async(_bucketName, fileName,
            fileStream);
        await _templateRepository.UploadTemplateAsync(new TemplateData
        {
            FileName = fileName,
            Url = $"https://{_bucketName}.s3.ap-southeast-1.amazonaws.com/{fileName}",
            Score = 0
        });
    }
}