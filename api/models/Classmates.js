import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  img: String,
  name:String,
  surname:String,
  tg:String,
  insta:String,
  birthday:String,
  height:String,
  status:String,
  stuwor:String,
  tel:String,
})

export const ClassModel = mongoose.model("Classmates", ClassSchema);