using System.Security.Claims;
using InstaResume.WebSite.Configuration;
using InstaResume.WebSite.Configuration.Interface;
using InstaResume.WebSite.Service;
using InstaResume.WebSite.Service.Interface;
using InstaResume.WebSite.Utils;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", corsPolicyBuilder =>
    {
        corsPolicyBuilder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddAuthentication()
    .AddBearerToken();
builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var securityScheme = new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        
        Scheme = "Bearer",
        Description = "Please enter into field the word 'Bearer' following by space and JWT"
    };

    options.AddSecurityDefinition("Bearer", securityScheme);
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddSingleton<ClaimsPrincipal>();
builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddSingleton<IConfigHelper, ConfigHelper>();
builder.Services.AddSingleton<IResumeCreationService, ResumeCreationService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();