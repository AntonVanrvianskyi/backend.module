import {model, Schema, Types} from "mongoose";
import { CarBrand} from "./car.brand.model";

const carModel = new Schema({
    name: {
        type: String,
        required: true
    },
    brandId: {
      type: Types.ObjectId,
      ref: CarBrand
    }
},{
    versionKey: false,
    timestamps: true
})

export const CarModel = model("models", carModel)