using Microsoft.AspNetCore.Mvc;

namespace InstaResume.WebSite.Controller;

[ApiController]
[Route("[controller]")]
public class ResumeCreationController
{
    [HttpGet]
    public IResult Get()
    {
        return Results.Ok();
    }
}