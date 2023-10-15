import axios from "axios";

const baseURL = 'https://api.privatbank.ua/p24api';

export const axiosService = axios.create({ baseURL })

const urls = {
    get: (data: string)=> `/exchange_rates?json&date=${data}`
}
class Bank {
    async getCurrency(currentDate: string){
      return  axiosService.get(urls.get(currentDate), )
    }
}


export const privateBankService = new Bank()
