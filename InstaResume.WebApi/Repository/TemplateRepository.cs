using InstaResume.WebSite.ConnectionProvider.Interface;
using InstaResume.WebSite.Model;
using InstaResume.WebSite.Repository.Interface;
using MongoDB.Driver;

namespace InstaResume.WebSite.Repository;

public class TemplateRepository : ITemplateRepository
{
    private IMongoConnectionProvider _mongoConnectionProvider;
    private IMongoCollection<TemplateData> _templateCollection;

    public TemplateRepository(IMongoConnectionProvider mongoConnectionProvider)
    {
        _mongoConnectionProvider = mongoConnectionProvider;
        _templateCollection = _mongoConnectionProvider.GetCollection<TemplateData>("templates");
    }
    
    public async Task UploadTemplateAsync(TemplateData templateData)
    {
        await _templateCollection.InsertOneAsync(templateData);
    }

    public async Task<TemplateData> GetTemplateDataAsync(string id)
    {
        return await _templateCollection.Find(t => t.Id == id).FirstOrDefaultAsync();
    }

    public Task<List<TemplateData>> GetAllTemplates()
    {
        return _templateCollection.Find(t => true).ToListAsync();
    }
}