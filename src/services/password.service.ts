import bcrypt from "bcrypt"
import {configs} from "../configs";
import {Types} from "mongoose";

class PasswordService {
        async hashedPassword(password:string):Promise<string>{
            return bcrypt.hash(password, 7)
        }
        async compare(password: string, hashedPassword: string): Promise<boolean>{
            return bcrypt.compare(password, hashedPassword)
        }
}


export const passwordService = new PasswordService()