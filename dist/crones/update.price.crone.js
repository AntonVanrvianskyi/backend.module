"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePriceAdvertisement = void 0;
const cron_1 = require("cron");
const services_1 = require("../services");
const dayjs_1 = __importDefault(require("dayjs"));
const enums_1 = require("../enums");
const updatePriceCrone = async () => {
    const currentDate = (0, dayjs_1.default)().format("DD.MM.YYYY");
    services_1.privateBankService.getCurrency(currentDate).then(value => {
        const { exchangeRate } = value.data;
        const filterRate = exchangeRate.filter((value) => value.currency === enums_1.EAdvertisement.USD || value.currency === enums_1.EAdvertisement.EUR);
        console.log(filterRate);
    });
};
exports.updatePriceAdvertisement = new cron_1.CronJob("36 23 * * *", updatePriceCrone);
