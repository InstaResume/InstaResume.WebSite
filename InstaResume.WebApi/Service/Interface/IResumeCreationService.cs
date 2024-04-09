using InstaResume.WebSite.Model;

namespace InstaResume.WebSite.Service.Interface;

public interface IResumeCreationService
{
    public byte[] CreateResumeFromHTML();
    public Task CreateResumeFromHTMLWithPuppeteer();
    public Task<byte[]> CreateResumeWithApi(CreateResumeRequest request);
}