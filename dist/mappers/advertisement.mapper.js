"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertisementMapper = void 0;
class AdvertisementMapper {
    changeResponseAdvertisementArray(advertisement) {
        const responseArray = [];
        advertisement.forEach(value => {
            const newValue = {
                brand: value.brand,
                model: value.model,
                year: value.year,
                overview: value.overview,
                price: value.price,
                region: value.region,
                currency: value.currency
            };
            responseArray.push(newValue);
        });
        return responseArray;
    }
    changeResponseAdvertisement(advertisement) {
        return {
            brand: advertisement.brand,
            model: advertisement.model,
            year: advertisement.year,
            overview: advertisement.overview,
            price: advertisement.price,
            region: advertisement.region,
            currency: advertisement.currency
        };
    }
}
exports.advertisementMapper = new AdvertisementMapper();
