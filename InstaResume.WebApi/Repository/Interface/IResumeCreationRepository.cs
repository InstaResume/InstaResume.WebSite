using InstaResume.WebSite.Model;

namespace InstaResume.WebSite.Repository.Interface;

public interface IResumeCreationRepository
{
    Task SaveResume(ResumeData resumeData);
    Task SaveResumeData(ResumeData resumeData);
    Task UpdateResumeData(ResumeData resumeData);
    Task<List<ResumeData>> GetAllResumesFromUserId(string userId);
    Task<ResumeData> GetResumeDataFromUserId(string userId);
}