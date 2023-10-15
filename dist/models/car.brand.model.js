"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarBrand = void 0;
const mongoose_1 = require("mongoose");
const CarBrandModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.CarBrand = (0, mongoose_1.model)("brands", CarBrandModel);
