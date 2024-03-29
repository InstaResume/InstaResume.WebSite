using System.Security.Claims;
using InstaResume.WebSite.Model;
using InstaResume.WebSite.Service.Interface;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InstaResume.WebSite.Controller;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private IHttpContextAccessor _httpContextAccessor;
    private IAuthService _authService;

    public AuthController(IHttpContextAccessor httpContextAccessor, IAuthService authService)
    {
        _httpContextAccessor = httpContextAccessor;
        _authService = authService;
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
    
    [HttpGet("oauth")]
    public IActionResult ExternalLogin(string provider, string returnUrl = "/")
    {
        var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Auth", new { returnUrl });
        var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
        return Challenge(properties, provider);
    }
    
    [HttpGet("oauth/callback")]
    public async Task<IActionResult> ExternalLoginCallback(string returnUrl = "/")
    {
        var authenticateResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        if (!authenticateResult.Succeeded)
        {
            return RedirectToAction(nameof(Login));
        }

        // Handle external login (create user, sign in, etc.)

        return LocalRedirect(returnUrl);
    }
    
}