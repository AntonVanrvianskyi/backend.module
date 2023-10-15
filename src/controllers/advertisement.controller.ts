import { Request, Response, NextFunction } from "express"

import {advertisementService} from "../services";
import {ApiError, IAdvertisement, IResponseAdvertisement} from "../interfaces";
import {UploadedFile} from "express-fileupload";
import {advertisementMapper} from "../mappers/advertisement.mapper";

class AdvertisementController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<void>>{
        try {

            const { id:userId } = req.res.locals
            const body = req.body as IAdvertisement
            await advertisementService.create(body, userId)
            return res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }
    public async uploadPhoto(req: Request, res: Response, next: NextFunction): Promise<Response<void>>{
        try {
            const { id: userId } = req.res.locals
            const file = req.files.car as UploadedFile
            await advertisementService.uploadPhoto(file, userId)
            return res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }
    public async deletePhoto(req: Request, res: Response, next: NextFunction){
        try {
                const { id: userId } = req.res.locals
                await advertisementService.deletePhoto(userId)
            return res.sendStatus(200)
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<IResponseAdvertisement>>{
        try {
           const advertisement = await advertisementService.getAll()
           const response = advertisementMapper.changeResponseAdvertisementArray(advertisement)
            return res.status(200).json(response)
        }catch (e) {
            next(e)
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction){
        try {
            const { id:userId } = req.res.locals
           const adArray = await advertisementService.getById(userId)
            return res.status(200).json(adArray)
        }catch (e) {
            next(e)
        }
    }
}


export const advertisementController = new AdvertisementController()