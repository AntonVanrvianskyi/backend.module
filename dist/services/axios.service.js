"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateBankService = exports.axiosService = void 0;
const axios_1 = __importDefault(require("axios"));
const baseURL = 'https://api.privatbank.ua/p24api';
exports.axiosService = axios_1.default.create({ baseURL });
const urls = {
    get: (data) => `/exchange_rates?json&date=${data}`
};
class Bank {
    async getCurrency(currentDate) {
        return exports.axiosService.get(urls.get(currentDate));
    }
}
exports.privateBankService = new Bank();
