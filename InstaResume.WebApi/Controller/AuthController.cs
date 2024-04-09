using InstaResume.WebSite.Model;
using InstaResume.WebSite.Service.Interface;
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
    
    [HttpPost("login")]
    public async Task<ActionResult<JwtToken>> Login(UserLoginRequest user)
    {
        try
        {
            var token = await _authService.Login(user);
            return Ok(token);
        }
        catch (Exception ex)
        {
            return ex switch
            {
                BadHttpRequestException => BadRequest(ex.Message),
                UnauthorizedAccessException => Unauthorized(ex.Message),
                _ => Problem(ex.Message)
            };
        }
        
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterRequest user)
    {
        try
        {
            await _authService.Register(user);
            return Ok();
        }
        catch (Exception e)
        {
            if (e is BadHttpRequestException)
            {
                return BadRequest(e.Message);
            }

            return Problem(e.Message);
        }
    }
    
    [HttpGet("myInfo")]
    [Authorize]
    public async Task<ActionResult<User>> GetUser()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        return await _authService.GetDetail(user);
    }
}