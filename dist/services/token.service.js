"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const enums_1 = require("../enums");
class TokenService {
    generateAuthToken(payload) {
        const access = jsonwebtoken_1.default.sign(payload, configs_1.configs.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refresh = jsonwebtoken_1.default.sign(payload, configs_1.configs.JWT_REFRESH_SECRET, { expiresIn: '1d' });
        return {
            access,
            refresh
        };
    }
    verify(token, tokenType) {
        let secret;
        switch (tokenType) {
            case enums_1.EAuthTokenType.Access:
                secret = configs_1.configs.JWT_ACCESS_SECRET;
                break;
            case enums_1.EAuthTokenType.Refresh:
                secret = configs_1.configs.JWT_REFRESH_SECRET;
                break;
        }
        return jsonwebtoken_1.default.verify(token, secret);
    }
}
exports.tokenService = new TokenService();
