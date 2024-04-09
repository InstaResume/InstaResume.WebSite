using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using InstaResume.WebSite.Configuration.Interface;
using InstaResume.WebSite.Model;
using InstaResume.WebSite.Repository.Interface;
using InstaResume.WebSite.Service.Interface;
using InstaResume.WebSite.Utils;
using Microsoft.IdentityModel.Tokens;

namespace InstaResume.WebSite.Service;

public class AuthService : IAuthService
{
    private IUserRepository _userRepository;
    private IConfigHelper _configHelper;

    public AuthService(IUserRepository userRepository, IConfigHelper configHelper)
    {
        _userRepository = userRepository;
        _configHelper = configHelper;
    }

    public async Task<JwtToken> Login(UserLoginRequest user)
    {
        var existingUser = await _userRepository.GetUserByEmail(user.Email);
        if (existingUser is null)
            throw new BadHttpRequestException("User does not exist");
        if (user.Password is null)
            throw new BadHttpRequestException("Password is required");
        if (!PasswordHasher.VerifyPassword(user.Password, existingUser.HashedPassword!))
            throw new BadHttpRequestException("Invalid password");
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenKey = Encoding.ASCII.GetBytes(_configHelper.GetAuthenticationConfig().Jwt.Key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, existingUser.Email),
                new Claim("Id", existingUser.Id!)
            }),
            Expires = DateTime.UtcNow.AddHours(24),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        if (token == null) throw new UnauthorizedAccessException();
        return new JwtToken
        {
            AccessToken = tokenHandler.WriteToken(token)
        };
    }
    
    public async Task Register(UserRegisterRequest user)
    {
        var existingUser = await _userRepository.GetUserByEmail(user.Email);
        if (existingUser is not null)
            throw new BadHttpRequestException("User already exists");
        var newUser = new User
        {
            Username = user.Username,
            Email = user.Email,
            HashedPassword = PasswordHasher.HashPassword(user.Password),
        };
        await _userRepository.CreateUser(newUser);
    }

    public async Task<User> GetDetail(ClaimsPrincipal? claimsPrincipal)
    {
        if (claimsPrincipal is not null)
        {
            var userId = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userId is null)
                throw new BadHttpRequestException("User not found");
            return await _userRepository.GetUserById(userId.Value);
        }
        throw new BadHttpRequestException("User undefined");
    }
}