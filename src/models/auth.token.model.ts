import {model, Schema} from "mongoose";
import {User} from "./user.model";

const AuthTokenModel = new Schema({
    access:{
       type: String
    },
    refresh:{
      type: String
    },
    userId: {
        type: String,
        ref: User
    }
})

export const AuthToken = model("auth", AuthTokenModel)