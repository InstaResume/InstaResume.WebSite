using Newtonsoft.Json;

namespace InstaResume.WebSite.Model;

public class CreateResumeRequest
{
    [JsonProperty("replacements")]
    public object Replacements { get; set; }
}

public class Replacement
{
    [JsonProperty("findText")]
    public string FindText { get; set; }
    
    [JsonProperty("replaceText")]
    public string ReplaceText { get; set; }
}