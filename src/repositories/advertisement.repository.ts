import {ApiError, IAdvertisement} from "../interfaces";
import {Advertisement, User} from "../models";
import {EAdvertisementStatus, EUserRoles, EUserTypeAccount} from "../enums";
import {advertisementMapper} from "../mappers/advertisement.mapper";


class AdvertisementRepository {
    public advertisementId: string[]
    constructor() {
        this.advertisementId = []
    }
    async setDb(data: IAdvertisement, userId: string){
        try {
            const advertisement = await Advertisement.create({...data, userId, status: EAdvertisementStatus.Active })
            this.advertisementId.push(advertisement._id.toString())
            await User.findByIdAndUpdate(userId,{ $set: { advertisement: [...this.advertisementId]} })

        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    async change(data:IAdvertisement, userId: string){
      await Advertisement.create({...data, userId, status: EAdvertisementStatus.InActive})
    }
    public async getById(userId: string){
        try {
            const user = await User.findById(userId)
            if (user.roles === EUserRoles.Manager || user.roles === EUserRoles.Admin){
                return Advertisement.find()

            }else if (user.roles === EUserRoles.User && user.typeAccount === EUserTypeAccount.Base ){
                const ad = await Advertisement.findOne({ userId }) as IAdvertisement
                return advertisementMapper.changeResponseAdvertisement(ad)
            }else if (user.roles === EUserRoles.User && user.typeAccount === EUserTypeAccount.Premium){

            }




        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

export const advertisementRepository = new AdvertisementRepository()