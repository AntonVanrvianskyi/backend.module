import {IAdvertisement, IResponseAdvertisement} from "../interfaces";

class AdvertisementMapper {

    public changeResponseAdvertisementArray(advertisement: IAdvertisement[]) {
        const responseArray: IResponseAdvertisement[] = []
        advertisement.forEach(value => {
            const newValue: IResponseAdvertisement = {
                brand: value.brand,
                model: value.model,
                year: value.year,
                overview: value.overview,
                price: value.price,
                region: value.region,
                currency: value.currency
            }
            responseArray.push(newValue)
        })
        return responseArray
    }

    public changeResponseAdvertisement(advertisement: IAdvertisement) {
        return {
            brand: advertisement.brand,
            model: advertisement.model,
            year: advertisement.year,
            overview: advertisement.overview,
            price: advertisement.price,
            region: advertisement.region,
            currency: advertisement.currency
        }
    }
}


export const advertisementMapper = new AdvertisementMapper()