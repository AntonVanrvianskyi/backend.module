import Joi from "joi";
import {regexConstant} from "../constants";

export class UserValidator {
    static password = Joi.string().regex(regexConstant.password).trim();
    static email = Joi.string().regex(regexConstant.email).trim();
    static authValidator = Joi.object({
        email: this.email.required(),
        password: this.password.required()
    })
    static advertisementValidator = Joi.object({
        brand: Joi.string().trim(),
        model: Joi.string().trim(),
        year: Joi.string().min(4).max(4),
        overview: Joi.string().regex(regexConstant.overview),
        price: Joi.number().min(3),
        region: Joi.string().regex(regexConstant.overview),
        currency: Joi.string().regex(regexConstant.overview)
    })
    static buyPremium = Joi.object({
        cardNumber: Joi.string().regex(regexConstant.card).trim().required(),
        cvvCode: Joi.string().regex(regexConstant.cvv).trim().required(),
        termDate: Joi.string().regex(regexConstant.term).trim().required()
    })

}