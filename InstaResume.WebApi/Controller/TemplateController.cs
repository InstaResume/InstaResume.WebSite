using InstaResume.WebSite.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace InstaResume.WebSite.Controller;

[ApiController]
[Route("[controller]")]
public class TemplateController : ControllerBase
{
    private IHttpContextAccessor _httpContextAccessor;
    private ITemplateService _templateService;

    public TemplateController(IHttpContextAccessor httpContextAccessor, ITemplateService templateService)
    {
        _httpContextAccessor = httpContextAccessor;
        _templateService = templateService;
    }
    
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadFile()
    {
        var formFile = Request.Form.Files[0];
        if (formFile == null || formFile.Length <= 0)
        {
            return BadRequest("File is required.");
        }

        using (var fileStream = formFile.OpenReadStream())
        {
            await _templateService.UploadFileToS3Async(fileStream);
        }

        return Ok("File uploaded successfully.");
    }
}