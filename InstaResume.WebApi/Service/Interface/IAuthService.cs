using System.Security.Claims;
using InstaResume.WebSite.Model;

namespace InstaResume.WebSite.Service.Interface;

public interface IAuthService
{
    Task<JwtToken> Login(UserLoginRequest user);
    public Task Register(UserRegisterRequest user);
    Task<User> GetDetail(ClaimsPrincipal? claimsPrincipal);
}