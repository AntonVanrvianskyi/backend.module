"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesMiddleware = void 0;
const repositories_1 = require("../repositories");
const enums_1 = require("../enums");
const interfaces_1 = require("../interfaces");
class RolesMiddleware {
    constructor() {
        this.counter = 0;
    }
    checkedRoles(field) {
        return async (req, res, next) => {
            try {
                const { id } = req.res.locals;
                const userEntity = await repositories_1.userRepository.findUser(id);
                if (userEntity.roles !== field) {
                    throw new Error("no access");
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    async accessCreate(req, res, next) {
        try {
            const { id } = req.res.locals;
            const user = await repositories_1.userRepository.findUser(id);
            if (!user) {
                throw new interfaces_1.ApiError("User not found", 400);
            }
            if (user.typeAccount === enums_1.EUserTypeAccount.Base && user.advertisement.length === 1) {
                throw new interfaces_1.ApiError("Buy premium account", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.rolesMiddleware = new RolesMiddleware();
