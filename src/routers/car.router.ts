import {Router} from "express"
import {carController} from "../controllers";
import {rolesMiddleware, authMiddleware, commonMiddleware} from "../middlewares";
import {EUserRoles} from "../enums";

const router = Router()

router.get("/brands", carController.getBrand)

router.get("/models/:brandId", commonMiddleware.isIdValid, carController.getModel)

router.post("/create",
    authMiddleware.checkAccessToken,
    rolesMiddleware.checkedRoles(EUserRoles.Admin),
    carController.createCar)



export const carRouter = router