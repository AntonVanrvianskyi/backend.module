"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertisementRepository = void 0;
const interfaces_1 = require("../interfaces");
const models_1 = require("../models");
const enums_1 = require("../enums");
const advertisement_mapper_1 = require("../mappers/advertisement.mapper");
class AdvertisementRepository {
    constructor() {
        this.advertisementId = [];
    }
    async setDb(data, userId) {
        try {
            const advertisement = await models_1.Advertisement.create({ ...data, userId, status: enums_1.EAdvertisementStatus.Active });
            this.advertisementId.push(advertisement._id.toString());
            await models_1.User.findByIdAndUpdate(userId, { $set: { advertisement: [...this.advertisementId] } });
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
    async change(data, userId) {
        await models_1.Advertisement.create({ ...data, userId, status: enums_1.EAdvertisementStatus.InActive });
    }
    async getById(userId) {
        try {
            const user = await models_1.User.findById(userId);
            if (user.roles === enums_1.EUserRoles.Manager || user.roles === enums_1.EUserRoles.Admin) {
                return models_1.Advertisement.find();
            }
            else if (user.roles === enums_1.EUserRoles.User && user.typeAccount === enums_1.EUserTypeAccount.Base) {
                const ad = await models_1.Advertisement.findOne({ userId });
                return advertisement_mapper_1.advertisementMapper.changeResponseAdvertisement(ad);
            }
            else if (user.roles === enums_1.EUserRoles.User && user.typeAccount === enums_1.EUserTypeAccount.Premium) {
            }
        }
        catch (e) {
            throw new interfaces_1.ApiError(e.message, e.status);
        }
    }
}
exports.advertisementRepository = new AdvertisementRepository();
