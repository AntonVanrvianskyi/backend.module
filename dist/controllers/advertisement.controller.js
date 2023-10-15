"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertisementController = void 0;
const services_1 = require("../services");
const interfaces_1 = require("../interfaces");
const advertisement_mapper_1 = require("../mappers/advertisement.mapper");
class AdvertisementController {
    async create(req, res, next) {
        try {
            const { id: userId } = req.res.locals;
            const body = req.body;
            await services_1.advertisementService.create(body, userId);
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
    async uploadPhoto(req, res, next) {
        try {
            const { id: userId } = req.res.locals;
            const file = req.files.car;
            await services_1.advertisementService.uploadPhoto(file, userId);
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
    async deletePhoto(req, res, next) {
        try {
            const { id: userId } = req.res.locals;
            await services_1.advertisementService.deletePhoto(userId);
            return res.sendStatus(200);
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async getAll(req, res, next) {
        try {
            const advertisement = await services_1.advertisementService.getAll();
            const response = advertisement_mapper_1.advertisementMapper.changeResponseAdvertisementArray(advertisement);
            return res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { id: userId } = req.res.locals;
            const adArray = await services_1.advertisementService.getById(userId);
            return res.status(200).json(adArray);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.advertisementController = new AdvertisementController();
