using InstaResume.WebSite.Model;
using InstaResume.WebSite.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace InstaResume.WebSite.Controller;

[ApiController]
[Route("[controller]")]
public class ResumeCreationController : ControllerBase
{
    private IResumeCreationService _resumeCreationService;

    public ResumeCreationController(IResumeCreationService resumeCreationService)
    {
        _resumeCreationService = resumeCreationService;
    }

    [HttpGet]
    public IResult Get(string name)
    {
        return Results.Ok();
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
}