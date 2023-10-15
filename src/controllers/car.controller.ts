import {NextFunction, Request, Response} from "express";
import {carService} from "../services";
import {IBrandCar, IModelCar, IPaginationCar, IQuery} from "../interfaces";

class CarController {
    public async getBrand(req: Request, res: Response, next: NextFunction): Promise<Response<IPaginationCar<IBrandCar>>>{
        try {
           const cars = await carService.getBrand(req.query as unknown as IQuery)
            return res.status(201).json(cars)
        }catch (e) {
            next(e)
        }
    }
    public async createCar(req: Request, res: Response, next: NextFunction): Promise<Response<void>>{
        try {
            await carService.create(req.body)
            return res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }
    public async getModel(req: Request, res: Response, next: NextFunction): Promise<Response<IPaginationCar<IModelCar>>>{
        try {
            const { brandId } = req.params
           const models = await carService.getModel(brandId, req.query as unknown as IQuery)
            return res.json(models)
        }catch (e) {
            next(e)
        }
    }
}

export const carController = new CarController()