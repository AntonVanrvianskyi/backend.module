
export interface IAdvertisement {
    userId: string,
    brand: string,
    model: string,
    year: string,
    photoPath: string[]
    overview: string
    price: number,
    region: string[]
    currency: string,
    status?: string,
    viewsDay?: number,
    viewsWeek?: number
    viewsMonth?: number
}
export interface IResponseAdvertisement {
    brand: string
    model: string
    year: string
    overview: string
    price: number
    region: string[]
    currency: string
}