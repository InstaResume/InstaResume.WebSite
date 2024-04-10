using Amazon.S3.Model;

namespace InstaResume.WebSite.ConnectionProvider.Interface;

public interface IS3ConnectionProvider
{
    Task DownloadFileFromS3Async(string bucketName, string keyName, string localFilePath);
    Task<PutObjectResponse> UploadFileToS3Async(string bucketName, string keyName, Stream fileStream);
}