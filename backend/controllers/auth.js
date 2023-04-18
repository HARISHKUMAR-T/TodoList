const User = require("../models/User");
const bcrypt=require('bcryptjs')
const {BadRequestError,NotFoundError,UnauthenticatedError}=require('../errors');
const { StatusCodes } = require("http-status-codes");
const signup=async(req,res)=>{
    //creating user in database
    const user =await User.create({...req.body});
    res.status(200).json({msg:"success"});
}
const login=async(req,res)=>{
    console.log("logged in");
    //destructure
    const{email,password}=req.body;
    //if both email and password is not empty,then proceed
    if(!email || !password){
        throw new BadRequestError("Please enter email and password")
    }
    //First, check email exists in db
    const user=await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("user does not exists")
    }
    //Second, compare password
    const isPasswordCorrect=await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Password is incorrect")
    }
    //create jwt token
    const token=user.createJwt()
    res.status(StatusCodes.OK).json({token})
}
const forgetpassword=async(req,res)=>{
    const {email,password}=req.body;
    //if both email and password is not empty,then proceed
    if(!email || !password){
        throw new BadRequestError("Please enter email and password")
    }
    //hash the password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)
    //First, check email exists in db
    const user=await User.findOneAndUpdate(
        {email},{password:hashedPassword},{new:true,runValidators:true})
    console.log(user);
    if(!user){
        throw new UnauthenticatedError("Please enter valid email")
    }
    res.status(200).json({msg:"success"})
}

module.exports={signup,login,forgetpassword}
