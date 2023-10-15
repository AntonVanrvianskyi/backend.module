import {NextFunction, Request, Response} from "express";
import {passwordService, tokenService} from "../services";
import {EAuthTokenType} from "../enums";
import {ApiError} from "../interfaces";
import {userRepository} from "../repositories";

class AuthMiddleware {
    public async checkedUser(req: Request, res: Response, next: NextFunction){
        try {
            const { email, password } = req.body
            const user = await userRepository.findOne({ email })
            if (!user){
                throw new ApiError("Invalid email, or password", 400)
            }
            const isMatched = await passwordService.compare(password, user.password)
            if (!isMatched){
                throw new ApiError("Invalid email, or password", 400)
            }
            req.res.locals = user
            next()
        }catch (e) {
            next(e)
        }
    }
    public async checkAccessToken(req: Request, res: Response, next: NextFunction){
        try {
            const access = req.get("Authorization")
            if (!access){
                throw new Error("token not valid")
            }
            const payload = tokenService.verify(access, EAuthTokenType.Access)
            if (!payload){
                throw new Error("token not valid")
            }
            req.res.locals = {id: payload.id}
            next()
        }catch (e) {
            next(e)
        }
    }
    public async checkRefreshToken(req: Request, res: Response, next: NextFunction){
        try {
            const refresh = req.get("Authorization")
            if (!refresh){
                throw new ApiError("No token", 401)
            }
            const oldTokenPair = await userRepository.getToken(refresh)
            if (!oldTokenPair){
                throw new ApiError("Token not valid", 401)
            }
            const payload = tokenService.verify(refresh, EAuthTokenType.Refresh)
            req.res.locals.oldTokenPair = oldTokenPair
            req.res.locals.tokenPayload = { id: payload.id }
            next()
        }catch (e) {
            next(e)
        }
    }


}


export const authMiddleware = new AuthMiddleware()