using InstaResume.WebSite.Model;

namespace InstaResume.WebSite.Repository.Interface;

public interface IUserRepository
{
    Task CreateUser(User user);
    Task<User> GetUserByEmail(string email);
    Task<User> GetUserById(string id);
}