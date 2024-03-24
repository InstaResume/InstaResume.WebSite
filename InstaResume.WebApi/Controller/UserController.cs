using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InstaResume.WebSite.Controller;

[ApiController]
[Route("[controller]")]
public class UserController
{
    private IHttpContextAccessor _httpContextAccessor;

    public UserController(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    
    [HttpGet("login")]
    public IResult Login(string username, string role)
    {
        var claimsPrincipal = new ClaimsPrincipal(
            new ClaimsIdentity(
                new[] { new Claim(ClaimTypes.Name, username), new Claim(ClaimTypes.Role, role) },
                BearerTokenDefaults.AuthenticationScheme
            )
        );

        return Results.SignIn(claimsPrincipal);
    }
    
    [HttpGet("/user")]
    [Authorize]
    public IResult GetUser()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        return Results.Ok($"Welcome {user?.Identity?.Name}!");
    }
    
    [HttpGet("/privilege")]
    [Authorize(Roles = "Admin")]
    public IResult GetPrivilege()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        return Results.Ok($"Your privilege is {user?.FindFirst(ClaimTypes.Role)?.Value}!");
    }
}