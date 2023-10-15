import {ApiError, IAdvertisement} from "../interfaces";
import {advertisementRepository} from "../repositories/advertisement.repository";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.service";
import {Advertisement} from "../models";

class AdvertisementService {
    public async create(body: IAdvertisement, userId: string):Promise<void>{
        try {
            await advertisementRepository.setDb(body, userId)

        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    async uploadPhoto(file: UploadedFile, userId: string):Promise<void>{
        try {
            const photoPath = await s3Service.sendFile(file, userId)
           const advertisement = await Advertisement.findOne({ userId })
            if (!advertisement){
                throw new ApiError("Create advertisement", 400)
            }
            await Advertisement.updateOne({ userId }, { $set: { photoPath  } })

        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    async deletePhoto(userId: string): Promise<void>{
        try {
            const advertisement = await Advertisement.findOne({ userId })
            if (!advertisement){
                throw new ApiError("Create advertisement", 400)
            }
            await Promise.all([
                 s3Service.deletePhoto(advertisement.photoPath),
                 Advertisement.findByIdAndUpdate(advertisement._id, { $set: { photoPath: null } }, { new: true})
            ])
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    public async getAll(): Promise<IAdvertisement[]>{
        try {
            return Advertisement.find()

        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    public async getById(userId: string){
        try {
          return await advertisementRepository.getById(userId)
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}


export const advertisementService = new AdvertisementService()