using System.Security.Cryptography;
using System.Text;

namespace InstaResume.WebSite.Utils;

public class PasswordHasher
{
    public static string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Convert the byte array to a hexadecimal string
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < hashedBytes.Length; i++)
            {
                builder.Append(hashedBytes[i].ToString("x2"));
            }
            return builder.ToString();
        }
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        // Hash the provided password and compare it with the stored hashed password
        string hashedInput = HashPassword(password);
        return hashedInput.Equals(hashedPassword, StringComparison.OrdinalIgnoreCase);
    }
}