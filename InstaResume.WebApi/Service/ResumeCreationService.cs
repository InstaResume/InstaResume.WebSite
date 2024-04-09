using InstaResume.WebSite.Configuration.Interface;
using InstaResume.WebSite.Model;
using InstaResume.WebSite.Service.Interface;
using iText.Html2pdf;
using iText.Kernel.Pdf;
using iText.Layout;
using PuppeteerSharp;

namespace InstaResume.WebSite.Service;

public class ResumeCreationService : IResumeCreationService
{
    private IConfigHelper _configHelper;

    public ResumeCreationService(IConfigHelper configHelper)
    {
        _configHelper = configHelper;
    }

    public byte[] CreateResumeFromHTML()
    {
        const string htmlFileName = "resume-old.html";
        var htmlFilePath = Path.Combine(Environment.CurrentDirectory, "Files", htmlFileName);
        const string pdfFileName = "demo.pdf";
        var html = File.ReadAllText(htmlFilePath);
        using var stream = new MemoryStream();
        
        // Create a PDF writer
        using (var writer = new PdfWriter(stream))
        {
            // Create a PDF document
            using (var pdf = new PdfDocument(writer))
            {
                // Create a document
                var document = new Document(pdf);

                // Parse the HTML content and add it to the document
                HtmlConverter.ConvertToPdf(html, pdf, new ConverterProperties());

                // Close the document
                document.Close();
            }
        }

        // Return the PDF content as a byte array
        return stream.ToArray();
    }

    public async Task CreateResumeFromHTMLWithPuppeteer()
    {
        const string htmlFileName = "resume.html";
        var htmlFilePath = Path.Combine(Environment.CurrentDirectory, "Files", htmlFileName);
        const string pdfFileName = "demo.pdf";
        var pdfFilePath = Path.Combine(Environment.CurrentDirectory, "Files", pdfFileName);
        var htmlContent = File.ReadAllText(htmlFilePath);

        await new BrowserFetcher().DownloadAsync();
        using (var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true }))
        using (var page = await browser.NewPageAsync())
        {
            await page.SetContentAsync(htmlContent);
            await page.PdfAsync(pdfFilePath, new PdfOptions { Format = PuppeteerSharp.Media.PaperFormat.A4 });
        }
    }

    public async Task<byte[]> CreateResumeWithApi(CreateResumeRequest request)
    {
        var apiUrl = _configHelper.GetPdfGeneratorConfig().Url;

        var client = new HttpClient();
        try
        {
            
            var response = await client.PostAsJsonAsync(apiUrl, request);
            response.EnsureSuccessStatusCode();
            var pdfBytes = await response.Content.ReadAsByteArrayAsync();
            return pdfBytes;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error generating PDF: {ex.Message}");
            throw;
        }
    }
}