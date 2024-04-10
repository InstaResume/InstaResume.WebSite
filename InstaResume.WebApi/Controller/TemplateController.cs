using InstaResume.WebSite.Model;
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
        var formFile1 = Request.Form.Files[0];
        var formFile2 = Request.Form.Files[1];
        if (formFile1 == null || formFile1.Length <= 0 || formFile2 == null || formFile2.Length <= 0)
        {
            return BadRequest("File is required.");
        }

        await using (var fileStream1 = formFile1.OpenReadStream())
        {
            await using(var fileStream2 = formFile2.OpenReadStream())
            {
                await _templateService.UploadFileToS3Async(fileStream1, fileStream2, formFile2.ContentType.Split("/")[1]);
            }
        }

        return Ok("File uploaded successfully.");
    }
    
    [HttpGet("download/{keyName}")]
    public async Task<IActionResult> DownloadFileFromS3(string keyName)
    {
        try
        {
            var stream = await _templateService.DownloadFileFromS3Async(keyName);
            return File(stream, "application/octet-stream", keyName);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error downloading file: {ex.Message}");
        }
    }
    
    [HttpGet("download-example")]
    public async Task<IActionResult> DownloadFileFromS3()
    {
        try
        {
            var stream = await _templateService.DownloadExampleTemplateFile();
            return File(stream, "application/octet-stream", "resume.hbs");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error downloading file: {ex.Message}");
        }
    }
    
    [HttpGet("source/{id}")]
    public async Task<ActionResult<TemplateSourceResponse>> GetTemplateSource(string id)
    {
        try
        {
            var source = await _templateService.GetTemplateSource(id);
            return Ok(new TemplateSourceResponse { Source = source });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error getting template source: {ex.Message}");
        }
    }
    
    [HttpGet]
    public async Task<ActionResult<List<TemplateData>>> GetTemplates()
    {
        return Ok(await _templateService.GetTemplates());
    }
}