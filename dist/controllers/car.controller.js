"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const services_1 = require("../services");
class CarController {
    async getBrand(req, res, next) {
        try {
            const cars = await services_1.carService.getBrand(req.query);
            return res.status(201).json(cars);
        }
        catch (e) {
            next(e);
        }
    }
    async createCar(req, res, next) {
        try {
            await services_1.carService.create(req.body);
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
    async getModel(req, res, next) {
        try {
            const { brandId } = req.params;
            const models = await services_1.carService.getModel(brandId, req.query);
            return res.json(models);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carController = new CarController();
