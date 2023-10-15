import {NextFunction, Request, Response} from "express";
import {userRepository} from "../repositories";
import {EUserTypeAccount} from "../enums";
import {ApiError} from "../interfaces";
class RolesMiddleware {

    public counter: number
    constructor() {
        this.counter = 0
    }


    public checkedRoles(field: string){
        return  async (req: Request, res: Response, next: NextFunction)=>{
            try {
                const { id } = req.res.locals
                const userEntity = await userRepository.findUser(id)
                if (userEntity.roles !== field){
                    throw new Error("no access")
                }
                next()
            }catch (e) {
                next(e)
            }
        }
    }
    public async accessCreate(req: Request, res: Response, next: NextFunction){
            try {
                const { id } = req.res.locals
                const user = await userRepository.findUser(id)
                if (!user){
                    throw new ApiError("User not found", 400)
                }
                if (user.typeAccount===EUserTypeAccount.Base&&user.advertisement.length===1){
                    throw new ApiError("Buy premium account", 400)
                }
                next()
            } catch (e) {
                next(e)
            }

    }


}

export const rolesMiddleware = new RolesMiddleware()