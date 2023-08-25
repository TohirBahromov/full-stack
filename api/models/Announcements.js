import mongoose from "mongoose";

const AnnSchema = new mongoose.Schema({
  title : String,
  img: String,
  text:String,
},{timestamps:true})

export const AnnModel = mongoose.model("Announcements", AnnSchema);