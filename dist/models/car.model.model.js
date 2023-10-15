"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = require("mongoose");
const car_brand_model_1 = require("./car.brand.model");
const carModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    brandId: {
        type: mongoose_1.Types.ObjectId,
        ref: car_brand_model_1.CarBrand
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.CarModel = (0, mongoose_1.model)("models", carModel);
