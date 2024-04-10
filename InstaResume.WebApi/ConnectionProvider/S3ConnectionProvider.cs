using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using InstaResume.WebSite.Configuration.Interface;
using InstaResume.WebSite.ConnectionProvider.Interface;

namespace InstaResume.WebSite.ConnectionProvider;

public class S3ConnectionProvider : IS3ConnectionProvider
{
    private IConfigHelper _configHelper;

    public S3ConnectionProvider(IConfigHelper configHelper)
    {
        _configHelper = configHelper;
    }
    
    public async Task DownloadFileFromS3Async(string bucketName, string keyName, string localFilePath)
    {
        using var client = new AmazonS3Client(_configHelper.GetAWSConfig().AccessKey, _configHelper.GetAWSConfig().SecretKey);
        var request = new GetObjectRequest
        {
            BucketName = bucketName,
            Key = keyName
        };

        using var response = await client.GetObjectAsync(request);
        await response.WriteResponseStreamToFileAsync(localFilePath, false, CancellationToken.None);
    }
    
    public async Task<PutObjectResponse> UploadFileToS3Async(string bucketName, string keyName, Stream fileStream)
    {
        using var client = new AmazonS3Client(_configHelper.GetAWSConfig().AccessKey, _configHelper.GetAWSConfig().SecretKey, RegionEndpoint.APSoutheast1);
        var request = new PutObjectRequest
        {
            BucketName = bucketName,
            Key = keyName,
            InputStream = fileStream
        };

        return await client.PutObjectAsync(request);
    }
}