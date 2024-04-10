using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace InstaResume.WebSite.Model;

public class TemplateData
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonProperty("_id")]
    public string? Id { get; set; }
    public string FileName { get; set; }
    public string Url { get; set; }
    public string ThumbnailUrl { get; set; }
    public int Score { get; set; }
}