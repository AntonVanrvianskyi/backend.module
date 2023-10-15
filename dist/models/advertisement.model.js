"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertisement = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const enums_1 = require("../enums");
const AdvertisementModel = new mongoose_1.Schema({
    userId: {
        type: String,
        ref: user_model_1.User,
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    photoPath: {
        type: String
    },
    overview: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        enum: enums_1.EAdvertisement,
        required: true
    },
    status: {
        type: String,
        enum: enums_1.EAdvertisementStatus,
    },
    viewsDay: {
        type: Number
    },
    viewsWeek: {
        type: Number
    },
    viewsMonth: {
        type: Number
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.Advertisement = (0, mongoose_1.model)("advertisements", AdvertisementModel);
