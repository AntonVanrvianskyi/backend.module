"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const models_1 = require("../models");
class UserRepository {
    async register(data, rolesType) {
        return models_1.User.create({ ...data, counter: 3, roles: rolesType, });
    }
    async saveAuthToken(tokenPair, userId) {
        await models_1.AuthToken.create({ ...tokenPair, userId });
    }
    async getToken(refresh) {
        return models_1.AuthToken.findOne({ refresh });
    }
    async deleteToken(refresh) {
        await models_1.AuthToken.deleteOne({ refresh });
    }
    async findUser(id) {
        return models_1.User.findById(id);
    }
    async findOne(filter) {
        return models_1.User.findOne(filter);
    }
    async update(userId, newPassword) {
        return models_1.User.findByIdAndUpdate(userId, { $set: { password: newPassword } }, { new: true });
    }
}
exports.userRepository = new UserRepository();
