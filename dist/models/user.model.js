"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const UserModel = new mongoose_1.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    typeAccount: {
        type: String,
        enum: enums_1.EUserTypeAccount,
        default: enums_1.EUserTypeAccount.Base
    },
    banStatus: {
        type: String,
        enum: enums_1.EUserBanStatus,
        default: enums_1.EUserBanStatus.NotBanned
    },
    counter: {
        type: Number,
        required: true
    },
    roles: {
        type: String,
        enum: enums_1.EUserRoles,
        default: enums_1.EUserRoles.Buyer
    },
    advertisement: {
        type: Array,
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.User = (0, mongoose_1.model)("users", UserModel);
