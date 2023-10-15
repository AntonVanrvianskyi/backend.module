"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const interfaces_1 = require("../interfaces");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
const repositories_1 = require("../repositories");
const enums_1 = require("../enums");
const models_1 = require("../models");
class AuthService {
    async login(user) {
        const tokenPair = token_service_1.tokenService.generateAuthToken({ id: user._id });
        await repositories_1.userRepository.saveAuthToken(tokenPair, user._id);
        return tokenPair;
    }
    async changePassword(data, userId) {
        try {
            const user = await repositories_1.userRepository.findUser(userId);
            const isMatched = await password_service_1.passwordService.compare(data.oldPassword, user.password);
            if (!isMatched) {
                throw new interfaces_1.ApiError("Wrong old password", 400);
            }
            const hashPassword = await password_service_1.passwordService.hashedPassword(data.newPassword);
            await repositories_1.userRepository.update(userId, hashPassword);
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async register(body) {
        try {
            const hashPassword = await password_service_1.passwordService.hashedPassword(body.password);
            const checkedUser = await repositories_1.userRepository.findOne({ email: body.email });
            if (checkedUser) {
                throw new interfaces_1.ApiError("Email already exist", 400);
            }
            const user = await repositories_1.userRepository.register({ email: body.email, password: hashPassword }, enums_1.EUserRoles.User);
            const newTokenPair = token_service_1.tokenService.generateAuthToken({ id: user._id });
            await repositories_1.userRepository.saveAuthToken(newTokenPair, user._id);
            return newTokenPair;
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async refresh(oldTokenPair, userId) {
        try {
            const newTokenPair = token_service_1.tokenService.generateAuthToken({ id: userId });
            await Promise.all([
                repositories_1.userRepository.deleteToken(oldTokenPair.refresh),
                repositories_1.userRepository.saveAuthToken(newTokenPair, userId)
            ]);
            return newTokenPair;
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async createManager(data) {
        try {
            const hashPassword = await password_service_1.passwordService.hashedPassword(data.password);
            const user = await repositories_1.userRepository.register({ email: data.email, password: hashPassword }, enums_1.EUserRoles.Manager);
            return token_service_1.tokenService.generateAuthToken({ id: user._id });
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async buyAccount(userId) {
        try {
            await models_1.User.findByIdAndUpdate(userId, { $set: { typeAccount: enums_1.EUserTypeAccount.Premium } }, { new: true });
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
