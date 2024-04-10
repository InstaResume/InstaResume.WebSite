using System.Security.Claims;
using System.Text;
using dotenv.net;
using InstaResume.WebSite.Configuration;
using InstaResume.WebSite.Configuration.Interface;
using InstaResume.WebSite.ConnectionProvider;
using InstaResume.WebSite.ConnectionProvider.Interface;
using InstaResume.WebSite.Repository;
using InstaResume.WebSite.Repository.Interface;
using InstaResume.WebSite.Service;
using InstaResume.WebSite.Service.Interface;
using InstaResume.WebSite.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables().Build();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", corsPolicyBuilder =>
    {
        corsPolicyBuilder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddAuthentication(auth =>
    {
        auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(auth =>
    { var configHelper = new ConfigHelper(builder.Configuration);
        auth.RequireHttpsMetadata = false;
        auth.SaveToken = true;
        auth.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey =
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configHelper.GetAuthenticationConfig().Jwt.Key)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
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
builder.Services.AddSingleton<IMongoConnectionProvider, MongoConnectionProvider>();
builder.Services.AddSingleton<IResumeCreationRepository, ResumeCreationRepository>();
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<IDescriptionGeneratorService, DescriptionGeneratorService>();
builder.Services.AddSingleton<IS3ConnectionProvider, S3ConnectionProvider>();
builder.Services.AddSingleton<ITemplateService, TemplateService>();
builder.Services.AddSingleton<ITemplateRepository, TemplateRepository>();

// Load the .env file
DotEnv.Load();

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