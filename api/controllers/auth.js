import { UserModel } from "../models/Users.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const Salt = bcrypt.genSaltSync(10)
const jwtSecret = process.env.JWT_SECRET

export const register = async (req,res) => {
  try{
    const {name,email,password} = req.body
    const existingUser = await UserModel.findOne({name:name})
    if(existingUser){
      res.json("Bu nom bilan foydalanuvchi allaqachon mavjud")
    }else{
      const hashedPassword = bcrypt.hashSync(password,Salt)
      const newUser = new UserModel({
        name,
        img:"noname.png",
        email,
        password:hashedPassword,
        telegram : "",
        instagram : "",
        bio : ""
      })
      newUser.save();
      jwt.sign({userId:newUser._id, userName: newUser.name},jwtSecret,(err, token)=>{
        if(err){
          res.json("Xatolik yuz berdi")
        }else{
          res.cookie("token",token).status(200).json("success")
        }
      })
    }
  }catch(err){
    res.json({msg:err})
  }
}
export const login = async (req,res) => {
  const {name, password} = req.body
  const foundUser = await UserModel.findOne({name:name})
  if(!foundUser){
    res.json("Bunday ismli foydalanuvchi mavjud emas!")
  }else{
    const isPassCorrect = bcrypt.compareSync(password, foundUser.password)
    if(!isPassCorrect){
      res.json("Parolda xatolik bor")
    }else{
      jwt.sign({userId:foundUser._id, userName:foundUser.name},jwtSecret,(err,token)=>{
        if(err) res.json("Xatolik yuz berdi")
        res.cookie("token",token).json("success")
      })
    }
  }
}
export const profile = (req,res) => {
  const token = req.cookies?.token
  if(token){
    jwt.verify(token,jwtSecret,(err,userData)=>{
      if(err){
        console.log(err);
      }else{
        res.json(userData)
      } 
    })
  }else{
    res.json("no token")
  }
}