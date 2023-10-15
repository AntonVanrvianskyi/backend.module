"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronRunner = void 0;
const update_price_crone_1 = require("./update.price.crone");
const cronRunner = () => {
    update_price_crone_1.updatePriceAdvertisement.start();
};
exports.cronRunner = cronRunner;
