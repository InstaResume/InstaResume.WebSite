using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;


namespace InstaResume.WebSite.Utils;

public class AddPdfAcceptHeaderFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var producesAttribute = context.ApiDescription.ActionDescriptor.EndpointMetadata
            .OfType<ProducesAttribute>()
            .FirstOrDefault(attr => attr.ContentTypes.Contains("application/json"));
        
        if (producesAttribute != null)
        {
            operation.Responses["200"].Content.Add("application/pdf", new OpenApiMediaType
            {
                Schema = new OpenApiSchema { Type = "string", Format = "binary" }
            });
        }
    }
}