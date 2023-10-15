import {IAuthToken, IRegister, IUser} from "../interfaces";
import {AuthToken, User} from "../models";
import {EUserRoles} from "../enums";
import {Types} from "mongoose";

class UserRepository {

    async register(data: IRegister, rolesType: EUserRoles): Promise<IUser>{
        return User.create({...data, counter:3, roles: rolesType, })
    }
    async saveAuthToken(tokenPair: IAuthToken, userId:Types.ObjectId){
        await AuthToken.create({...tokenPair, userId })
    }
    async getToken(refresh: string){
       return AuthToken.findOne({ refresh })
    }
    async deleteToken(refresh: string){
        await AuthToken.deleteOne({ refresh })
    }
    async findUser(id: Types.ObjectId){
        return User.findById(id)
    }
    async findOne(filter: Record<string, string>){
        return User.findOne(filter)
    }
    async update(userId: string, newPassword: string){
        return  User.findByIdAndUpdate(userId,{ $set:{ password: newPassword } }, { new: true })
    }
}

export const userRepository = new UserRepository()