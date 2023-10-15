"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = exports.Counter = void 0;
const bad_words_1 = __importDefault(require("bad-words"));
const mongoose_1 = require("mongoose");
const interfaces_1 = require("../interfaces");
const repositories_1 = require("../repositories");
const models_1 = require("../models");
const configs_1 = require("../configs");
const filter = new bad_words_1.default();
class Counter {
    static decrement() {
        --this.counter;
    }
    static updateCounter(userCounter) {
        this.counter = userCounter;
    }
    static getCounter() {
        return this.counter;
    }
}
exports.Counter = Counter;
Counter.counter = 3;
class CommonMiddleware {
    isIdValid(req, res, next) {
        try {
            const { brandId } = req.params;
            if (!(0, mongoose_1.isValidObjectId)(brandId)) {
                throw new Error("id not valid");
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    overviewValid(validator) {
        return (req, res, next) => {
            try {
                const { id } = req.res.locals;
                const { error, value } = validator.validate(req.body);
                if (error) {
                    throw new Error(error.message);
                }
                const advertisement = req.body;
                const isProfane = filter.isProfane(advertisement.overview);
                if (isProfane) {
                    Counter.decrement();
                    this.updateUSerCounter(id, Counter.getCounter()).then(value1 => Counter.updateCounter(value1.counter));
                    if (Counter.getCounter() === 0) {
                        this.updateAdvertisement(value, id).then(() => console.log("Promise is resolved"));
                    }
                    throw new interfaces_1.ApiError(`${Counter.getCounter() === 0 ? "the ad has been sent to the manager for review" : `you have ${Counter.getCounter()} attempts left`}`, 400);
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    bodyValid(validator) {
        return (req, res, next) => {
            try {
                const { error, value } = validator.validate(req.body);
                if (error) {
                    throw new Error(error.message);
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    filesValid(req, res, next) {
        try {
            if (Array.isArray(req.files.car)) {
                throw new interfaces_1.ApiError("file must be not array", 400);
            }
            const { size, mimetype } = req.files.car;
            if (!configs_1.carPhotoConfig.mimetype.includes(mimetype)) {
                throw new interfaces_1.ApiError("not mimetype", 400);
            }
            if (size > configs_1.carPhotoConfig.size) {
                throw new interfaces_1.ApiError("file very big", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async updateAdvertisement(data, userId) {
        await repositories_1.advertisementRepository.change(data, userId);
    }
    async updateUSerCounter(userId, classCounter) {
        return models_1.User.findByIdAndUpdate(userId, { $set: { counter: classCounter } }, { new: true });
    }
}
exports.commonMiddleware = new CommonMiddleware();
