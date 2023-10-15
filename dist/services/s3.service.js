"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Service = void 0;
const interfaces_1 = require("../interfaces");
const client_s3_1 = require("@aws-sdk/client-s3");
const configs_1 = require("../configs");
class S3Service {
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: configs_1.configs.AWS_S3_REGION,
            credentials: {
                accessKeyId: configs_1.configs.AWS_ACCESS_KEY,
                secretAccessKey: configs_1.configs.AWS_SECRET_KEY
            }
        });
    }
    async sendFile(file, userId) {
        try {
            const filePath = `cars/${userId}/${file.name}`;
            await this.client.send(new client_s3_1.PutObjectCommand({
                Key: filePath,
                Bucket: configs_1.configs.AWS_S3_NAME,
                Body: file.data,
                ACL: configs_1.configs.AWS_S3_ACL,
                ContentType: file.mimetype,
            }));
            return filePath;
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async deletePhoto(photoPath) {
        try {
            await this.client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: configs_1.configs.AWS_S3_NAME,
                Key: photoPath
            }));
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
}
exports.s3Service = new S3Service();
