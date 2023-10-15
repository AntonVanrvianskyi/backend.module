import jwt from "jsonwebtoken"
import {configs} from "../configs";
import {IAuthToken, IPayload} from "../interfaces";
import {EAuthTokenType} from "../enums";

class TokenService {
    generateAuthToken(payload: IPayload):IAuthToken {
        const access = jwt.sign(payload, configs.JWT_ACCESS_SECRET,
            {expiresIn: '30m'})
        const refresh = jwt.sign(payload, configs.JWT_REFRESH_SECRET,
            {expiresIn: '1d'}
            )
        return {
            access,
            refresh
        }
    }
    verify(token:string, tokenType: EAuthTokenType): IPayload{
        let secret;

        switch (tokenType) {
            case EAuthTokenType.Access: secret = configs.JWT_ACCESS_SECRET
                break;
            case EAuthTokenType.Refresh: secret = configs.JWT_REFRESH_SECRET
                break;
        }
        return jwt.verify(token, secret) as IPayload
    }
}


export const tokenService = new TokenService()