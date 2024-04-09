using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InstaResume.WebSite.Model;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore]
    public string? Id { get; set; }
    public string? Username { get; set; }
    public string Email { get; set; }
    [BsonIgnore]
    [JsonIgnore]
    public string? Password { get; set; }
    [JsonIgnore]
    public string? HashedPassword { get; set; }
    [JsonIgnore]
    public string? GoogleAuthToken { get; set; }
}