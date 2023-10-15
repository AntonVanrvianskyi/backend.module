import {ApiError, ICreateCar, IModelCar, IPaginationCar, IQuery} from "../interfaces";
import {carRepository} from "../repositories";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.service";
import {Advertisement} from "../models";


class CarService {
    async getBrand(query: IQuery){
        try {
            return carRepository.getBrand(query)
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    async getModel(brandId: string, query: IQuery): Promise<IPaginationCar<IModelCar>>{
        try {
            return carRepository.getModel(brandId, query)
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    async create(data:ICreateCar){
        try {
            await carRepository.setDbCar(data)
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }


}
export const carService = new CarService()