"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = __importDefault(require("node:http"));
const mongoose = __importStar(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const configs_1 = require("./configs");
const interfaces_1 = require("./interfaces");
const routers_1 = require("./routers");
const models_1 = require("./models");
const services_1 = require("./services");
const enums_1 = require("./enums");
const crones_1 = require("./crones");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
const server = node_http_1.default.createServer(app);
app.use("/cars", routers_1.carRouter);
app.use("/auth", routers_1.authRouter);
app.use("/advertisement", routers_1.advertisementRouter);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).json({
        status: err.status,
        message: err.message
    });
});
const connectDb = async () => {
    try {
        await mongoose.connect(configs_1.configs.DB_URL);
        const user = await models_1.User.findOne({ email: configs_1.configs.ADMIN_LOGIN });
        if (!user) {
            const hashPassword = await services_1.passwordService.hashedPassword(configs_1.configs.ADMIN_PASS);
            await models_1.User.create({ email: configs_1.configs.ADMIN_LOGIN, password: hashPassword, roles: enums_1.EUserRoles.Admin });
        }
        else
            console.log("admin user already exist");
    }
    catch (e) {
        throw new interfaces_1.ApiError(e.message, e.status);
    }
};
server.listen(configs_1.configs.PORT, async () => {
    try {
        await connectDb();
        (0, crones_1.cronRunner)();
        console.log(`Server started on ${configs_1.configs.PORT} port`);
    }
    catch (e) {
        throw new interfaces_1.ApiError(e.message, e.status);
    }
});
