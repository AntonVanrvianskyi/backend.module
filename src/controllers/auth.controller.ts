import {NextFunction, Request, Response} from "express";
import {authService} from "../services";
import {IAuthToken, IUser} from "../interfaces";

class AuthController {
    public async login(req: Request, res: Response, next: NextFunction): Promise<Response<IAuthToken>>{
        try {

          const tokenPair = await authService.login(req.res.locals as IUser)
            return res.status(201).json(tokenPair)
        }catch (e) {
            next(e)
        }
    }
    public async changePassword(req: Request, res: Response, next: NextFunction): Promise<Response<void>>{
        try {
            const { id } =  req.res.locals
            await authService.changePassword(req.body, id)
            return res.sendStatus(200)
        }catch (e) {
            next(e)
        }

    }
    public async register(req: Request, res: Response, next: NextFunction): Promise<Response<IAuthToken>>{
        try {
           const tokenPair = await authService.register(req.body)
            return res.status(201).json(tokenPair)
        }catch (e) {
            next(e)
        }
    }
    public async refresh(req: Request, res: Response, next: NextFunction):Promise<Response<IAuthToken>>{
        try {
           const oldTokenPair = req.res.locals.oldTokenPair
           const { id } = req.res.locals.tokenPayload
           const newTokenPair = await authService.refresh(oldTokenPair, id)
            return res.status(201).json(newTokenPair)
        }catch (e) {
            next(e)
        }
    }
    public async createManager(req: Request, res: Response, next: NextFunction): Promise<Response<IAuthToken>>{
        try {
           const tokenPair = await authService.createManager(req.body)
            return res.status(201).json(tokenPair)
        }catch (e) {
            next(e)
        }
    }
    public async buyAccount(req: Request, res: Response, next: NextFunction): Promise<Response<void>>{
        try {
            const { id: userId } = req.res.locals
            await authService.buyAccount(userId)
            return res.sendStatus(200)

        }catch (e) {
            next(e)
        }
    }
}


export const authController = new AuthController()