import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
//import { uploadOnCloudinary } from "../cloudinary.js";
import dotenv from "dotenv";
import { sendVerificationCode } from "../middlewares/Email.js";
dotenv.config();


export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const verificationCode=Math.floor(100000+Math.random()*900000).toString();
    const newUser = new User({username,email,password:hashedPassword,verificationCode});

    console.log(req.file);
    // if(req.file){
    //     const uploadResult=await uploadOnCloudinary(req.file.path);
    //     console.log(uploadResult)
    // }
    try{
     await newUser.save();
     sendVerificationCode(newUser.email,verificationCode);
     res.status(201).json('user created successfuly')
    } catch(error){
        console.log('sign up error: ',error)
        next(error);
    }
}
export const signin=async(req,res,next)=>{
     const {email,password}=req.body;
     try{
        const validUser=await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'user not found!'))
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401,'wrong credentials!'));
        }
        const token=jwt.sign({id:validUser._id},`${process.env.JWT_SECRET}`);
        const {password: pass,...rest}=validUser._doc;
        res
        .cookie('access_token',token,{ httpOnly:true,secure:true })
        .status(200)
        .json(rest);
     }catch(error){
        next(error);
    }
}
export const google=async(req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...rest}=user._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);
        }
        else{
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
            const newUser=new User({username: req.body.name.split(" ").join("").toLowerCase()+Math.random().
                toString(36).slice(-4),email:req.body.email,password:hashedPassword,avatar:req.body.photo
            });
            await newUser.save();
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:pass,...rest}=newUser._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);

        }
    } catch (error) {
       next(error); 
    }
}
export const uploadPhoto=async(req,res,next)=>{
    console.log(req.file)
    console.log(req.file.avatar)
    res.status(202).json("file uploaded successfully");
}
export const signOut=async(req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out');
    } catch (error) {
        next(error);
    }
};
export const verifyemail=async(req,res)=>{
    try {
        const {code}=req.body;
        const user=await User.findOne({
            verificationCode:code
        })
        if(!user){
            return res.status(400).json({success:false,message:"invalid code"});
        }
        user.isverified=true;
        user.verificationCode=undefined;
        await user.save();
    } catch (error) {
        console.log(error);
    }
}
