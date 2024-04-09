using Newtonsoft.Json;

namespace InstaResume.WebSite.Model;

public class CreateResumeRequest
{
    [JsonProperty("replacements")]
    public object Replacements { get; set; }
}
