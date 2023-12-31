"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertisementRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
router.post("/create", middlewares_1.authMiddleware.checkAccessToken, middlewares_1.rolesMiddleware.accessCreate, middlewares_1.commonMiddleware.overviewValid(validators_1.UserValidator.advertisementValidator), controllers_1.advertisementController.create);
router.post("/upload-photo", middlewares_1.authMiddleware.checkAccessToken, middlewares_1.commonMiddleware.filesValid, controllers_1.advertisementController.uploadPhoto);
router.delete("/delete-photo", middlewares_1.authMiddleware.checkAccessToken, controllers_1.advertisementController.deletePhoto);
router.get("/all", controllers_1.advertisementController.getAll);
router.get("/getById", middlewares_1.authMiddleware.checkAccessToken, controllers_1.advertisementController.getById);
exports.advertisementRouter = router;
