namespace InstaResume.WebSite.Model;

public class JwtToken
{
    public string TokenType { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public int ExpiresIn { get; set; }
}