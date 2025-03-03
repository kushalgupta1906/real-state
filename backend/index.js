import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from "cors"
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.routes.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

//import cookieParser from "cookie-parser";
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log("MongoDB Connection Error:",err)
})
const _dirname=path.resolve();
const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "20mb"}))
app.use(express.static("backend/public"))
app.listen(5001, ()=>{
    console.log('server is running on port 5000!!')
})
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/listing',listingRouter);
app.use(express.static(path.join(_dirname,'/client/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(_dirname,'client','dist','index.html'));
})
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});
