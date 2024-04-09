using System.IdentityModel.Tokens.Jwt;
using InstaResume.WebSite.Model;
using Microsoft.IdentityModel.Tokens;

namespace InstaResume.WebSite.Utils;

public interface IJwtTokenHelper
{
    JwtSecurityTokenHandler TokenHandler { get; set; }
    SecurityToken Generate(User user);
}