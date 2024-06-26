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

    public Task<List<TemplateData>> GetTemplates()
    {
        return _templateRepository.GetAllTemplates();
    }

    public async Task<string> GetTemplateSource(string id)
    {
        var template = await _templateRepository.GetTemplateDataAsync(id);
        return await _s3ConnectionProvider.GetContentFromFileFromS3Async(_bucketName, template.FileName + ".hbs");
    }
    
    public async Task<Stream> DownloadFileFromS3Async(string keyName)
    {
        return await _s3ConnectionProvider.DownloadFileFromS3Async(_bucketName, "resume.hbs");
    }
    
    public async Task<Stream> DownloadExampleTemplateFile()
    {
        return await _s3ConnectionProvider.DownloadFileFromS3Async(_bucketName, "resume.hbs");
    }
    
    public async Task UploadFileToS3Async(Stream fileStream1, Stream fileStream2, string imgFileType)
    {
        var fileName = Guid.NewGuid().ToString();
        await _s3ConnectionProvider.UploadFileToS3Async(_bucketName, fileName + ".hbs",
            fileStream1);
        await _s3ConnectionProvider.UploadFileToS3Async(_bucketName, fileName + "." + imgFileType,
            fileStream2);
        await _templateRepository.UploadTemplateAsync(new TemplateData
        {
            FileName = fileName,
            Url = $"https://{_bucketName}.s3.ap-southeast-1.amazonaws.com/{fileName}.hbs",
            ThumbnailUrl = $"https://{_bucketName}.s3.ap-southeast-1.amazonaws.com/{fileName}.{imgFileType}",
            Score = 0
        });
    }
}