namespace InstaResume.WebSite.Model;

public class User
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string HashedPassword { get; set; }
    public string GoogleAuthToken { get; set; }
}