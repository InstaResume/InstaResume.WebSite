using InstaResume.WebSite.Model;

namespace InstaResume.WebSite.Service.Interface;

public interface IDescriptionGeneratorService
{
    Task<GeneratedDescription> GenerateDescription(GetGenDescriptionRequest descRequest);
}