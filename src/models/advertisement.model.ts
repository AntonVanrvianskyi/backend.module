import {model,  Schema} from "mongoose";
import {User} from "./user.model";
import {EAdvertisement, EAdvertisementStatus} from "../enums";
import {IAdvertisement} from "../interfaces";

const AdvertisementModel = new Schema({
    userId:{
        type: String,
        ref: User,
    },
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    photoPath:{
      type: String
    },
    overview:{
      type: String,
      required: true
    },
    price:{
        type: Number,
        required: true
    },
    region:{
        type: String,
        required: true
    },
    currency:{
        type: String,
        enum:EAdvertisement,
        required: true
    },
    status:{
        type:String,
        enum: EAdvertisementStatus,

    },
    viewsDay:{
      type: Number
    },
    viewsWeek:{
        type: Number
    },
    viewsMonth:{
        type: Number
    }
},{
    versionKey: false,
    timestamps: true,
})

export const Advertisement = model("advertisements", AdvertisementModel)