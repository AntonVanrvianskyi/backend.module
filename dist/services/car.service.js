"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const interfaces_1 = require("../interfaces");
const repositories_1 = require("../repositories");
class CarService {
    async getBrand(query) {
        try {
            return repositories_1.carRepository.getBrand(query);
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async getModel(brandId, query) {
        try {
            return repositories_1.carRepository.getModel(brandId, query);
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async create(data) {
        try {
            await repositories_1.carRepository.setDbCar(data);
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
}
exports.carService = new CarService();
