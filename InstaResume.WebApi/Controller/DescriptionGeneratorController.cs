using InstaResume.WebSite.Model;
using InstaResume.WebSite.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace InstaResume.WebSite.Controller;

[ApiController]
[Route("[controller]")]
public class DescriptionGeneratorController : ControllerBase
{
    private readonly ILogger<DescriptionGeneratorController> _logger;
    private readonly IDescriptionGeneratorService _descriptionGeneratorService;

    public DescriptionGeneratorController(ILogger<DescriptionGeneratorController> logger,
        IDescriptionGeneratorService descriptionGeneratorService)
    {
        _logger = logger;
        _descriptionGeneratorService = descriptionGeneratorService;
    }

    [HttpPost("create")]
    public async Task<ActionResult<GeneratedDescription>> GetGenDescription(GetGenDescriptionRequest request)
    {
        try
        {
            return Ok(await _descriptionGeneratorService.GenerateDescription(request));
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
}