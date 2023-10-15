import {Document, Types} from "mongoose"

export interface ICreateCar {
    brand: string,
    model: string
}
export interface IModelCar {
    name: string,
    brandId: Types.ObjectId
}
export interface IBrandCar{
    name: string
}
export interface IPaginationCar<T> {
    page: number,
    perPage: number
    totalCount: number
    data: T[]

}