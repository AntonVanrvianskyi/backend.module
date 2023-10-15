"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
class AuthController {
    async login(req, res, next) {
        try {
            const tokenPair = await services_1.authService.login(req.res.locals);
            return res.status(201).json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async changePassword(req, res, next) {
        try {
            const { id } = req.res.locals;
            await services_1.authService.changePassword(req.body, id);
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
    async register(req, res, next) {
        try {
            const tokenPair = await services_1.authService.register(req.body);
            return res.status(201).json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const oldTokenPair = req.res.locals.oldTokenPair;
            const { id } = req.res.locals.tokenPayload;
            const newTokenPair = await services_1.authService.refresh(oldTokenPair, id);
            return res.status(201).json(newTokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async createManager(req, res, next) {
        try {
            const tokenPair = await services_1.authService.createManager(req.body);
            return res.status(201).json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async buyAccount(req, res, next) {
        try {
            const { id: userId } = req.res.locals;
            await services_1.authService.buyAccount(userId);
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
