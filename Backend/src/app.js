import express from 'express'

import cookieParser from 'cookie-parser'
import cors from "cors"
const app=express()
//use method use for middleware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//3 express configurations
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
 
export {app}