using System.Security.Claims;
using InstaResume.WebSite.Configuration.Interface;
using InstaResume.WebSite.Model;
using InstaResume.WebSite.Repository.Interface;
using InstaResume.WebSite.Service.Interface;

namespace InstaResume.WebSite.Service;

public class ResumeCreationService : IResumeCreationService
{
    private IConfigHelper _configHelper;
    private IResumeCreationRepository _resumeCreationRepository;

    public ResumeCreationService(IConfigHelper configHelper, IResumeCreationRepository resumeCreationRepository)
    {
        _configHelper = configHelper;
        _resumeCreationRepository = resumeCreationRepository;
    }

    public async Task<byte[]> CreateResumeWithApi(CreateResumeRequest request)
    {
        var apiUrl = _configHelper.GetPdfGeneratorConfig().Url;

        var client = new HttpClient();
        try
        {
            var response = await client.PostAsJsonAsync(apiUrl, request);
            response.EnsureSuccessStatusCode();
            var pdfBytes = await response.Content.ReadAsByteArrayAsync();
            return pdfBytes;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error generating PDF: {ex.Message}");
            throw;
        }
    }
    
    public async Task SaveResume(ResumeData resumeData, ClaimsPrincipal? claimsPrincipal)
    {
        if (claimsPrincipal is not null)
        {
            var userId = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "Id");
            resumeData.OwnerId = userId?.Value;
        }
        await _resumeCreationRepository.SaveResume(resumeData);
    }
    
    public async Task SaveResumeData(ResumeData resumeData, ClaimsPrincipal? claimsPrincipal)
    {
        if (claimsPrincipal is null) return;
        
        var userId = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "Id");
        resumeData.OwnerId = userId?.Value;
        if (userId is null) return;
        
        var existingData = await _resumeCreationRepository.GetResumeDataFromUserId(userId.Value);
        if (existingData == null)
        {
            await _resumeCreationRepository.SaveResumeData(resumeData);
        }
        else
        {
            resumeData.Id = existingData.Id;
            await _resumeCreationRepository.UpdateResumeData(resumeData);
        }
        
    }
    
    public async Task<List<ResumeData>> GetAllResumesFromUser(ClaimsPrincipal? claimsPrincipal)
    {
        var userId = claimsPrincipal?.Claims.FirstOrDefault(c => c.Type == "Id");
        if (userId is null)
            throw new BadHttpRequestException("User not found");
        return await _resumeCreationRepository.GetAllResumesFromUserId(userId.Value);
    }

    public async Task<ResumeData> GetResumeDataFromUser(ClaimsPrincipal? claimsPrincipal)
    {
        var userId = claimsPrincipal?.Claims.FirstOrDefault(c => c.Type == "Id");
        if (userId is null)
            throw new BadHttpRequestException("User not found");
        return await _resumeCreationRepository.GetResumeDataFromUserId(userId.Value);
    }
    
    public async Task<TemplateSourceResponse?> GetTemplateSource(string templateName)
    {
        var apiUrl = _configHelper.GetPdfGeneratorConfig().SourceUrl;

        var client = new HttpClient();
        try
        {
            var response = await client.GetAsync(apiUrl);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<TemplateSourceResponse>();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error getting HTML source: {ex.Message}");
            throw;
        }
    }
}