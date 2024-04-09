using InstaResume.WebSite.Configuration.Interface;
using InstaResume.WebSite.ConnectionProvider.Interface;
using MongoDB.Driver;

namespace InstaResume.WebSite.ConnectionProvider;

public class MongoConnectionProvider : IMongoConnectionProvider
{
    private IMongoClient _client;
    private IConfigHelper _configHelper;
    private IMongoDatabase _mongoDatabase;

    public MongoConnectionProvider(IConfigHelper configHelper)
    {
        _configHelper = configHelper;
        var databaseConfig = _configHelper.GetDatabaseConfig();
        _client = new MongoClient(databaseConfig.MongoConnectionString);
        _mongoDatabase = _client.GetDatabase("common");
    }
    
    public IMongoCollection<T> GetCollection<T>(string collectionName)
    {
        return _mongoDatabase.GetCollection<T>(collectionName);
    }
}