using InstaResume.WebSite.ConnectionProvider.Interface;
using InstaResume.WebSite.Model;
using InstaResume.WebSite.Repository.Interface;
using MongoDB.Driver;

namespace InstaResume.WebSite.Repository;

public class ResumeCreationRepository : IResumeCreationRepository
{
    private IMongoConnectionProvider _mongoConnectionProvider;
    private IMongoCollection<ResumeData> _resumeCollection;
    private IMongoCollection<ResumeData> _resumeDataCollection;

    public ResumeCreationRepository(IMongoConnectionProvider mongoConnectionProvider)
    {
        _mongoConnectionProvider = mongoConnectionProvider;
        _resumeCollection = _mongoConnectionProvider.GetCollection<ResumeData>("resumes");
        _resumeDataCollection = _mongoConnectionProvider.GetCollection<ResumeData>("resume-data");
    }

    public async Task SaveResume(ResumeData resumeData)
    {
        await _resumeCollection.InsertOneAsync(resumeData);
    }
    
    public async Task SaveResumeData(ResumeData resumeData)
    {
        await _resumeDataCollection.InsertOneAsync(resumeData);
    }
    
    public async Task UpdateResumeData(ResumeData resumeData)
    {
        await _resumeDataCollection.ReplaceOneAsync(r => r.OwnerId == resumeData.OwnerId, resumeData);
    }

    public async Task<List<ResumeData>> GetAllResumesFromUserId(string userId)
    {
        return await _resumeCollection.Find(r => r.OwnerId == userId).ToListAsync();
    }
    
    public async Task<ResumeData> GetResumeDataFromUserId(string userId)
    {
        return await _resumeDataCollection.Find(r => r.OwnerId == userId).FirstOrDefaultAsync();
    }
}