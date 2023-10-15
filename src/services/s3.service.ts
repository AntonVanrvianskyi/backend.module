import {UploadedFile} from "express-fileupload";
import {ApiError} from "../interfaces";
import {S3Client, PutObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import {configs} from "../configs";


class S3Service{
    private client
    constructor() {
    this.client = new S3Client({
        region: configs.AWS_S3_REGION,
        credentials: {
            accessKeyId: configs.AWS_ACCESS_KEY,
            secretAccessKey: configs.AWS_SECRET_KEY
        }
    })
    }
    public async sendFile(file: UploadedFile, userId: string): Promise<string>{
        try {
            const filePath = `cars/${userId}/${file.name}`
        await this.client.send(new PutObjectCommand({
            Key: filePath,
            Bucket: configs.AWS_S3_NAME,
            Body: file.data,
            ACL: configs.AWS_S3_ACL,
            ContentType: file.mimetype,
        }))
            return filePath
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    public async deletePhoto(photoPath: string){
        try {
            await this.client.send( new DeleteObjectCommand({
                Bucket: configs.AWS_S3_NAME,
                Key: photoPath
            }))

        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

}


export const s3Service = new S3Service()