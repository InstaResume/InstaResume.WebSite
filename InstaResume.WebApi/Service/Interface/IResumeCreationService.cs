using System.Security.Claims;
using InstaResume.WebSite.Model;

namespace InstaResume.WebSite.Service.Interface;

public interface IResumeCreationService
{
    public Task<byte[]> CreateResumeWithApi(CreateResumeRequest request);
    public Task SaveResume(ResumeData resumeData, ClaimsPrincipal claimsPrincipal);
    public Task SaveResumeData(ResumeData resumeData, ClaimsPrincipal? claimsPrincipal);
    public Task<List<ResumeData>> GetAllResumesFromUser(ClaimsPrincipal claimsPrincipal);
    public Task<ResumeData> GetResumeDataFromUser(ClaimsPrincipal? claimsPrincipal);
}