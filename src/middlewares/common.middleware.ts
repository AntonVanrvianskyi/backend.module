import  Filter from "bad-words"


import {NextFunction, Request, Response} from "express";
import {isValidObjectId} from "mongoose"
import {ObjectSchema} from "joi";
import {ApiError, IAdvertisement} from "../interfaces";
import {advertisementRepository} from "../repositories";
import {User} from "../models";
import {FileArray, UploadedFile} from "express-fileupload";
import {carPhotoConfig} from "../configs";
const filter = new Filter()

export class Counter {
    static counter = 3
    static decrement(){
        --this.counter
    }
    static updateCounter(userCounter: number){
        this.counter = userCounter
    }
    static getCounter(){
        return this.counter
    }
}
class CommonMiddleware {

    public isIdValid(req: Request, res: Response, next: NextFunction){
        try {
            const { brandId } = req.params
            if (!isValidObjectId(brandId)){
                throw new Error("id not valid")
            }
            next()
        }catch (e) {
            next(e)
        }
    }
    public overviewValid(validator: ObjectSchema){
        return (req: Request, res: Response, next: NextFunction)=>{
            try {
                const { id } = req.res.locals
                const { error, value } = validator.validate(req.body)
                if (error){
                    throw new Error(error.message)
                }
                const advertisement = req.body as IAdvertisement

                const isProfane = filter.isProfane(advertisement.overview)
                if (isProfane){
                    Counter.decrement()
                    this.updateUSerCounter(id, Counter.getCounter()).then(value1 => Counter.updateCounter(value1.counter) )

                    if (Counter.getCounter()===0){
                        this.updateAdvertisement(value,id).then(()=> console.log("Promise is resolved"))
                    }
                    throw new ApiError(`${Counter.getCounter()===0?"the ad has been sent to the manager for review":`you have ${Counter.getCounter()} attempts left`}`,400)
                }
                req.body = value
                next()

            }catch (e) {
                next(e)
            }
        }

    }
    public bodyValid(validator: ObjectSchema){
        return(req: Request, res: Response, next: NextFunction)=>{
            try {
                const {error, value} = validator.validate(req.body)
                if (error){
                    throw new Error(error.message)
                }
                req.body = value
                next()
            }catch (e) {
                next(e)
            }
        }
    }

    public filesValid(req: Request, res: Response, next: NextFunction){
        try {
           if (Array.isArray(req.files.car)){
               throw new ApiError("file must be not array", 400)
           }
            const { size, mimetype } = req.files.car
            if (!carPhotoConfig.mimetype.includes(mimetype)){
                throw new ApiError("not mimetype", 400)
            }
            if (size > carPhotoConfig.size){
                throw new ApiError("file very big", 400)
            }
            next()
        }catch (e) {
            next(e)
        }
    }
    private async updateAdvertisement(data:IAdvertisement, userId: string){
        await advertisementRepository.change(data, userId)
    }
    private async updateUSerCounter(userId: string, classCounter: number){
       return  User.findByIdAndUpdate(userId, { $set: { counter: classCounter } }, { new: true })
    }

}

export const commonMiddleware = new CommonMiddleware()