import {Schema, model} from "mongoose"
import {EUserBanStatus, EUserRoles, EUserTypeAccount} from "../enums";
import {Advertisement} from "./advertisement.model";


const UserModel = new Schema({
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    typeAccount:{
        type: String,
        enum: EUserTypeAccount,
        default: EUserTypeAccount.Base
    },
    banStatus:{
        type: String,
        enum: EUserBanStatus,
        default: EUserBanStatus.NotBanned
    },
    counter:{
      type: Number,
        required: true
    },
    roles:{
        type: String,
        enum: EUserRoles,
        default: EUserRoles.Buyer
    },
    advertisement:{
        type: Array,

    }

},{
    versionKey: false,
    timestamps: true
})

export const User = model("users", UserModel)