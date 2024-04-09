using MongoDB.Driver;

namespace InstaResume.WebSite.ConnectionProvider.Interface;

public interface IMongoConnectionProvider
{
    IMongoCollection<T> GetCollection<T>(string collectionName);
}