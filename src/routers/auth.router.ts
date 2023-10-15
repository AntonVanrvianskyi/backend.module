import {Router} from "express"
import {authMiddleware, commonMiddleware, rolesMiddleware} from "../middlewares";
import {authController} from "../controllers";
import {UserValidator} from "../validators";
import {EUserRoles} from "../enums";


const router = Router()

router.post("/register",
    commonMiddleware.bodyValid(UserValidator.authValidator),
    authController.register)

router.post("/login",
    commonMiddleware.bodyValid(UserValidator.authValidator),
    authMiddleware.checkedUser,
    authController.login)

router.post("/change-password",
    authMiddleware.checkAccessToken,
    rolesMiddleware.checkedRoles(EUserRoles.Admin),
    authController.changePassword)

router.post("/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh)


router.post("/create-manager",
    authMiddleware.checkAccessToken,
    rolesMiddleware.checkedRoles(EUserRoles.Admin),
    commonMiddleware.bodyValid(UserValidator.authValidator),
    authController.createManager)

router.post("/buy-account",
    authMiddleware.checkAccessToken,
    commonMiddleware.bodyValid(UserValidator.buyPremium),
    authController.buyAccount)

export const authRouter = router