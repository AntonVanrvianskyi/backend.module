import { CronJob } from "cron"
import {axiosService, privateBankService} from "../services";
import dayjs from "dayjs";
import {AxiosResponse} from "axios";
import {EAdvertisement} from "../enums";

interface IChange {
  currency: string
  saleRate: string
}

const updatePriceCrone = async () => {
  const currentDate = dayjs().format("DD.MM.YYYY")
  privateBankService.getCurrency(currentDate).then(value => {
      const { exchangeRate } = value.data
      const filterRate = exchangeRate.filter((value: IChange) => value.currency === EAdvertisement.USD || value.currency===EAdvertisement.EUR)

     console.log(filterRate)

  })

}


export const updatePriceAdvertisement = new CronJob("36 23 * * *", updatePriceCrone)