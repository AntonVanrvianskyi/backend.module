import {ApiError, IAuthToken, IRegister, IUser} from "../interfaces";
import {passwordService} from "./password.service";
import {tokenService} from "./token.service";
import {userRepository} from "../repositories";
import {EUserRoles, EUserTypeAccount} from "../enums";
import {Types} from "mongoose";
import {User} from "../models";

class AuthService {
    async login(user: IUser): Promise<IAuthToken> {
        const tokenPair = tokenService.generateAuthToken({id: user._id})
        await userRepository.saveAuthToken(tokenPair, user._id)
        return tokenPair
    }

    async changePassword(data: { oldPassword: string, newPassword: string }, userId: any): Promise<void> {
        try {
            const user = await userRepository.findUser(userId)
            const isMatched = await passwordService.compare(data.oldPassword, user.password)
            if (!isMatched) {
                throw new ApiError("Wrong old password", 400)
            }
            const hashPassword = await passwordService.hashedPassword(data.newPassword)
            await userRepository.update(userId, hashPassword)
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async register(body: IRegister): Promise<IAuthToken> {
        try {
            const hashPassword = await passwordService.hashedPassword(body.password)
            const checkedUser = await userRepository.findOne({email: body.email})
            if (checkedUser) {
                throw new ApiError("Email already exist", 400)
            }
            const user = await userRepository.register({email: body.email, password: hashPassword}, EUserRoles.User)
            const newTokenPair = tokenService.generateAuthToken({id: user._id})
            await userRepository.saveAuthToken(newTokenPair, user._id)
            return newTokenPair
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    public async refresh(oldTokenPair: IAuthToken, userId: Types.ObjectId): Promise<IAuthToken> {
        try {
            const newTokenPair = tokenService.generateAuthToken({id: userId})

            await Promise.all([
                userRepository.deleteToken(oldTokenPair.refresh),
                userRepository.saveAuthToken(newTokenPair, userId)
            ])
            return newTokenPair
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    public async createManager(data: IRegister): Promise<IAuthToken> {
        try {
            const hashPassword = await passwordService.hashedPassword(data.password)
            const user = await userRepository.register({email: data.email, password: hashPassword}, EUserRoles.Manager)
            return tokenService.generateAuthToken({id: user._id})

        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    public async buyAccount(userId: string): Promise<void> {
        try {
            await User.findByIdAndUpdate(userId, {$set: {typeAccount: EUserTypeAccount.Premium}}, {new: true})

        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

export const authService = new AuthService()