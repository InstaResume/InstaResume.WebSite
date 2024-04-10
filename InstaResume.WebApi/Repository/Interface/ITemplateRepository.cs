using InstaResume.WebSite.Model;

namespace InstaResume.WebSite.Repository.Interface;

public interface ITemplateRepository
{
    Task UploadTemplateAsync(TemplateData templateData);
    Task<TemplateData> GetTemplateDataAsync(string id);
    Task<List<TemplateData>> GetAllTemplates();
}