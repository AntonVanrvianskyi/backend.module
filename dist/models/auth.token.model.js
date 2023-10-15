"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const AuthTokenModel = new mongoose_1.Schema({
    access: {
        type: String
    },
    refresh: {
        type: String
    },
    userId: {
        type: String,
        ref: user_model_1.User
    }
});
exports.AuthToken = (0, mongoose_1.model)("auth", AuthTokenModel);
