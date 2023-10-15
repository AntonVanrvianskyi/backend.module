import {CarBrand, CarModel} from "../models";
import {ApiError, IBrandCar, ICreateCar, IPaginationCar, IQuery} from "../interfaces";


class CarRepository {
    async getBrand(query: IQuery): Promise<IPaginationCar<IBrandCar>>{
        try {
            const { page = 1, limit = 10} = query
            const skip = +limit * (+page - 1)
            const [brands, count] = await Promise.all([
                CarBrand.find().limit(+limit).skip(skip),
                CarBrand.count()
            ])
            return {
                page: +page,
                perPage: +limit,
                totalCount: count,
                data: brands
            }
        }catch (e) {
            throw  new ApiError(e.message, e.status)
        }
    }
    async getModel(brandId: string, query:IQuery): Promise<IPaginationCar<any>>{
        try {
            const { page = 1, limit = 10} = query
            const skip = +limit * (+page - 1)
            const [models, count] = await Promise.all([
                CarModel.find({ brandId }).limit(+limit).skip(skip),
                CarModel.count()
            ])
            return {
                page: +page,
                perPage: +limit,
                totalCount: count,
                data: models
            }
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }

    }
    async setDbCar({brand, model}: ICreateCar){
        try {
            const carBrandFind = await CarBrand.find({name: brand})
            const carModel = await CarModel.find({name: model})
            if (carBrandFind.length===0&&carModel.length===0){
                    const carBrand = await CarBrand.create({name: brand})
                    await CarModel.create({name: model, brandId: carBrand._id})

            }
            for (const value of carBrandFind) {
                for (const item of carModel) {
                    if (value.name===brand&&item.name===model){
                        throw new ApiError("машина існує", 400)
                    }
                }
                if (!carModel.length){
                  return  CarModel.create({name:model, brandId: value._id})
                }
            }
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

}

export const carRepository = new CarRepository()