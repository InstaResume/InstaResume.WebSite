using InstaResume.WebSite.Model;
using InstaResume.WebSite.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InstaResume.WebSite.Controller;

[ApiController]
[Route("[controller]")]
public class ResumeCreationController : ControllerBase
{
    private IHttpContextAccessor _httpContextAccessor;
    private IResumeCreationService _resumeCreationService;

    public ResumeCreationController(IHttpContextAccessor httpContextAccessor, IResumeCreationService resumeCreationService)
    {
        _httpContextAccessor = httpContextAccessor;
        _resumeCreationService = resumeCreationService;
    }

    [HttpGet("templateSource")]
    public async Task<ActionResult<TemplateSourceResponse>> Get(string name)
    {
        try
        {
            return Ok(await _resumeCreationService.GetTemplateSource(name));
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create(CreateResumeRequest request)
    {
        try
        {
            return File(await _resumeCreationService.CreateResumeWithApi(request), "application/pdf", "test.pdf");
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }
    }

    [HttpPost("save")]
    [Authorize]
    public async Task<IActionResult> Save(ResumeData resumeData)
    {
        try
        {
            var user = _httpContextAccessor.HttpContext?.User;
            await _resumeCreationService.SaveResume(resumeData, user);
            return Ok();
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }
    }
    
    [HttpPost("saveData")]
    [Authorize]
    public async Task<IActionResult> SaveData(ResumeData resumeData)
    {
        try
        {
            var user = _httpContextAccessor.HttpContext?.User;
            await _resumeCreationService.SaveResumeData(resumeData, user);
            return Ok();
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }
    }

    [HttpGet("myResume")]
    [Authorize]
    public async Task<ActionResult<List<ResumeData>>> GetAllResumesFromUser()
    {
        try
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return await _resumeCreationService.GetAllResumesFromUser(user);
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
    
    [HttpGet("myData")]
    [Authorize]
    public async Task<ActionResult<ResumeData>> GetResumeDataFromUser()
    {
        try
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return await _resumeCreationService.GetResumeDataFromUser(user);
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
}