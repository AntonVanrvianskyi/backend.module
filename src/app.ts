import express, {NextFunction, Request, Response} from "express"
import http from "node:http"
import * as mongoose from "mongoose";
import fileUpload from "express-fileupload"

import {configs} from "./configs";
import {ApiError} from "./interfaces";
import {carRouter, authRouter, advertisementRouter} from "./routers";
import {User} from "./models";
import {passwordService} from "./services";
import {EUserRoles} from "./enums";
import {cronRunner} from "./crones";


const app = express()
app.use(express.json())
app.use(fileUpload())
const server = http.createServer(app)

app.use("/cars", carRouter)
app.use("/auth", authRouter)
app.use("/advertisement", advertisementRouter)



app.use((err:ApiError, req: Request, res: Response, next: NextFunction)=>{
    const status = err.status || 500
    return res.status(status).json({
        status: err.status,
        message: err.message
    })

})
const connectDb = async ()=>{
    try {
        await mongoose.connect(configs.DB_URL)
        const user = await User.findOne({email: configs.ADMIN_LOGIN})
        if (!user){
            const hashPassword = await passwordService.hashedPassword(configs.ADMIN_PASS)
            await User.create({email: configs.ADMIN_LOGIN, password: hashPassword, roles: EUserRoles.Admin})
        }else console.log("admin user already exist")
    }catch (e) {
        throw new ApiError(e.message, e.status)
    }
}
server.listen(configs.PORT,async ()=>{
    try {
        await connectDb()
        cronRunner()
        console.log(`Server started on ${configs.PORT} port`)
    }catch (e) {
        throw new ApiError(e.message, e.status)
    }

})
