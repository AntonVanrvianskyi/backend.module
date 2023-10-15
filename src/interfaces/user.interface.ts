import {Types} from "mongoose";

export interface IUser {
    _id: Types.ObjectId,
    password: string
    email: string,
    typeAccount: string,
    banStatus: string,
    roles: string,
    counter: number
    advertisement?: string[]
}