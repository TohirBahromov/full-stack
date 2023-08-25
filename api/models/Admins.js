import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  signId:String,
  name : String,
  password:String,
  phone:Number
})

export const AdminModel = mongoose.model("Admins", AdminSchema);