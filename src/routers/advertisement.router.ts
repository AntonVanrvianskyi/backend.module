import {Router} from "express"
import {authMiddleware, commonMiddleware, rolesMiddleware} from "../middlewares";
import {advertisementController} from "../controllers";
import {UserValidator} from "../validators";

const router = Router()


router.post("/create",
    authMiddleware.checkAccessToken,
    rolesMiddleware.accessCreate,
    commonMiddleware.overviewValid(UserValidator.advertisementValidator),
    advertisementController.create
    )
router.post("/upload-photo",
    authMiddleware.checkAccessToken,
    commonMiddleware.filesValid,
    advertisementController.uploadPhoto)

router.delete("/delete-photo",
    authMiddleware.checkAccessToken,
    advertisementController.deletePhoto)

router.get("/all", advertisementController.getAll)

router.get("/getById",
    authMiddleware.checkAccessToken,
    advertisementController.getById)

export const advertisementRouter = router