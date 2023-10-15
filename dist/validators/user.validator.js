"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../constants");
class UserValidator {
}
exports.UserValidator = UserValidator;
_a = UserValidator;
UserValidator.password = joi_1.default.string().regex(constants_1.regexConstant.password).trim();
UserValidator.email = joi_1.default.string().regex(constants_1.regexConstant.email).trim();
UserValidator.authValidator = joi_1.default.object({
    email: _a.email.required(),
    password: _a.password.required()
});
UserValidator.advertisementValidator = joi_1.default.object({
    brand: joi_1.default.string().trim(),
    model: joi_1.default.string().trim(),
    year: joi_1.default.string().min(4).max(4),
    overview: joi_1.default.string().regex(constants_1.regexConstant.overview),
    price: joi_1.default.number().min(3),
    region: joi_1.default.string().regex(constants_1.regexConstant.overview),
    currency: joi_1.default.string().regex(constants_1.regexConstant.overview)
});
UserValidator.buyPremium = joi_1.default.object({
    cardNumber: joi_1.default.string().regex(constants_1.regexConstant.card).trim().required(),
    cvvCode: joi_1.default.string().regex(constants_1.regexConstant.cvv).trim().required(),
    termDate: joi_1.default.string().regex(constants_1.regexConstant.term).trim().required()
});
