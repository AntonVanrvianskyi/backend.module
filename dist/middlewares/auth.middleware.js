"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const enums_1 = require("../enums");
const interfaces_1 = require("../interfaces");
const repositories_1 = require("../repositories");
class AuthMiddleware {
    async checkedUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await repositories_1.userRepository.findOne({ email });
            if (!user) {
                throw new interfaces_1.ApiError("Invalid email, or password", 400);
            }
            const isMatched = await services_1.passwordService.compare(password, user.password);
            if (!isMatched) {
                throw new interfaces_1.ApiError("Invalid email, or password", 400);
            }
            req.res.locals = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkAccessToken(req, res, next) {
        try {
            const access = req.get("Authorization");
            if (!access) {
                throw new Error("token not valid");
            }
            const payload = services_1.tokenService.verify(access, enums_1.EAuthTokenType.Access);
            if (!payload) {
                throw new Error("token not valid");
            }
            req.res.locals = { id: payload.id };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refresh = req.get("Authorization");
            if (!refresh) {
                throw new interfaces_1.ApiError("No token", 401);
            }
            const oldTokenPair = await repositories_1.userRepository.getToken(refresh);
            if (!oldTokenPair) {
                throw new interfaces_1.ApiError("Token not valid", 401);
            }
            const payload = services_1.tokenService.verify(refresh, enums_1.EAuthTokenType.Refresh);
            req.res.locals.oldTokenPair = oldTokenPair;
            req.res.locals.tokenPayload = { id: payload.id };
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
