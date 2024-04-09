using InstaResume.WebSite.ConnectionProvider.Interface;
using InstaResume.WebSite.Model;
using InstaResume.WebSite.Repository.Interface;
using MongoDB.Driver;

namespace InstaResume.WebSite.Repository;

public class UserRepository : IUserRepository
{
    private IMongoConnectionProvider _mongoConnectionProvider;
    private IMongoCollection<User> _userCollection;

    public UserRepository(IMongoConnectionProvider mongoConnectionProvider)
    {
        _mongoConnectionProvider = mongoConnectionProvider;
        _userCollection = _mongoConnectionProvider.GetCollection<User>("users");
    }
    
    public async Task CreateUser(User user)
    {
        await _userCollection.InsertOneAsync(user);
    }
    
    public async Task<User> GetUserByEmail(string email)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Email, email);
        return await _userCollection.Find(filter).FirstOrDefaultAsync();
    }
    
    public async Task<User> GetUserById(string id)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Id, id);
        return await _userCollection.Find(filter).FirstOrDefaultAsync();
    }
}