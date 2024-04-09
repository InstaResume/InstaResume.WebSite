using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace InstaResume.WebSite.Model;

public class ResumeData
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonProperty("_id")]
    public string? Id { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string? OwnerId { get; set; }
    public string? TemplateUrl { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public List<string>? SocialLinks { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public string? ProfessionalSummary { get; set; }
    public List<string>? Skills { get; set; }
    public List<WorkExperienceObject>? WorkExperience { get; set; }
    public List<EducationObject>? Education { get; set; }
    public List<ProjectObject>? Projects { get; set; }
    public List<CertificateObject>? Certificates { get; set; }
}

public class WorkExperienceObject
{
    public string? JobTitle { get; set; }
    public string? Position { get; set; }
    public string? Employer { get; set; }
    public string? City { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Description { get; set; }
    public bool IsCurrentlyWorking { get; set; }
}

public class EducationObject
{
    public string? Major { get; set; }
    public string? Degree { get; set; }
    public string? School { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Description { get; set; }
    public bool IsCurrentlyStudying { get; set; }
}

public class ProjectObject
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public List<string>? Links { get; set; }
}

public class CertificateObject
{
    public string? Title { get; set; }
    public string? CredentialUrl { get; set; }
    public string? Description { get; set; }
    public List<string>? Skills { get; set; }
}