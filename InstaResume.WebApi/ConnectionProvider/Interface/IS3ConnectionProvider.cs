using Amazon.S3.Model;

namespace InstaResume.WebSite.ConnectionProvider.Interface;

public interface IS3ConnectionProvider
{
    Task<string> GetContentFromFileFromS3Async(string bucketName, string keyName);
    Task<Stream> DownloadFileFromS3Async(string bucketName, string keyName);
    Task<PutObjectResponse> UploadFileToS3Async(string bucketName, string keyName, Stream fileStream);
}