"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertisementService = void 0;
const interfaces_1 = require("../interfaces");
const advertisement_repository_1 = require("../repositories/advertisement.repository");
const s3_service_1 = require("./s3.service");
const models_1 = require("../models");
class AdvertisementService {
    async create(body, userId) {
        try {
            await advertisement_repository_1.advertisementRepository.setDb(body, userId);
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async uploadPhoto(file, userId) {
        try {
            const photoPath = await s3_service_1.s3Service.sendFile(file, userId);
            const advertisement = await models_1.Advertisement.findOne({ userId });
            if (!advertisement) {
                throw new interfaces_1.ApiError("Create advertisement", 400);
            }
            await models_1.Advertisement.updateOne({ userId }, { $set: { photoPath } });
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async deletePhoto(userId) {
        try {
            const advertisement = await models_1.Advertisement.findOne({ userId });
            if (!advertisement) {
                throw new interfaces_1.ApiError("Create advertisement", 400);
            }
            await Promise.all([
                s3_service_1.s3Service.deletePhoto(advertisement.photoPath),
                models_1.Advertisement.findByIdAndUpdate(advertisement._id, { $set: { photoPath: null } }, { new: true })
            ]);
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async getAll() {
        try {
            return models_1.Advertisement.find();
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async getById(userId) {
        try {
            return await advertisement_repository_1.advertisementRepository.getById(userId);
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
}
exports.advertisementService = new AdvertisementService();
