"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRepository = void 0;
const models_1 = require("../models");
const interfaces_1 = require("../interfaces");
class CarRepository {
    async getBrand(query) {
        try {
            const { page = 1, limit = 10 } = query;
            const skip = +limit * (+page - 1);
            const [brands, count] = await Promise.all([
                models_1.CarBrand.find().limit(+limit).skip(skip),
                models_1.CarBrand.count()
            ]);
            return {
                page: +page,
                perPage: +limit,
                totalCount: count,
                data: brands
            };
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async getModel(brandId, query) {
        try {
            const { page = 1, limit = 10 } = query;
            const skip = +limit * (+page - 1);
            const [models, count] = await Promise.all([
                models_1.CarModel.find({ brandId }).limit(+limit).skip(skip),
                models_1.CarModel.count()
            ]);
            return {
                page: +page,
                perPage: +limit,
                totalCount: count,
                data: models
            };
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async setDbCar({ brand, model }) {
        try {
            const carBrandFind = await models_1.CarBrand.find({ name: brand });
            const carModel = await models_1.CarModel.find({ name: model });
            if (carBrandFind.length === 0 && carModel.length === 0) {
                const carBrand = await models_1.CarBrand.create({ name: brand });
                await models_1.CarModel.create({ name: model, brandId: carBrand._id });
            }
            for (const value of carBrandFind) {
                for (const item of carModel) {
                    if (value.name === brand && item.name === model) {
                        throw new interfaces_1.ApiError("машина існує", 400);
                    }
                }
                if (!carModel.length) {
                    return models_1.CarModel.create({ name: model, brandId: value._id });
                }
            }
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
}
exports.carRepository = new CarRepository();
