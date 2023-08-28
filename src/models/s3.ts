import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
import { HeadObjectRequest, ListObjectsRequest, PutObjectRequest } from 'aws-sdk/clients/s3';

config();

type FileS3 = {
    content: string
    name: string
}

class AWSS3 {
    s3 = new S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });

    async listObjects(filter: string) {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Prefix: filter
        } as ListObjectsRequest;

        const result = await this.s3.listObjectsV2(params).promise();
        return result.Contents?.map(item => item.Key);
    }

    async uploadFile(file: FileS3): Promise<string | false> {

        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: file.name,
            Body: file.content
        } as PutObjectRequest;

        return (await this.s3.upload(params).promise()).Location || false
    }

    async doesFileExists(fileKey: string) {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileKey
        } as HeadObjectRequest;

        try {
            await this.s3.headObject(params).promise();
        } catch (error: any) {
            if (error.statusCode === 404) {
                return false;
            }
        }
        return true;
    }
}

export { AWSS3, FileS3 };