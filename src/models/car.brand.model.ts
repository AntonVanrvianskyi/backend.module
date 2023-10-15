import {model, Schema} from "mongoose";

const CarBrandModel = new Schema({
    name:{
        type: String,
        required: true
    }
},{
    versionKey: false,
    timestamps: true
})

export const CarBrand = model("brands", CarBrandModel)