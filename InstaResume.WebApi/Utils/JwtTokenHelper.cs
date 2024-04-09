using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using InstaResume.WebSite.Configuration.Interface;
using InstaResume.WebSite.Model;
using Microsoft.IdentityModel.Tokens;

namespace InstaResume.WebSite.Utils;

public class JwtTokenHelper : IJwtTokenHelper
{
    private IConfigHelper _configHelper;
    public JwtSecurityTokenHandler TokenHandler { get; set; } = new JwtSecurityTokenHandler();

    public JwtTokenHelper(IConfigHelper configHelper)
    {
        _configHelper = configHelper;
    }
    
    public SecurityToken Generate(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenKey = Encoding.ASCII.GetBytes(_configHelper.GetAuthenticationConfig().Jwt.Key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim("Id", user.Id!)
            }),
            Expires = DateTime.UtcNow.AddHours(24),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
        };
        return tokenHandler.CreateToken(tokenDescriptor);
    }
}