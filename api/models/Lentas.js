import mongoose from "mongoose";

const LentaSchema = new mongoose.Schema({
  title : String,
  img: String,
  text:String,
},{timestamps:true})

export const LentaModel = mongoose.model("Lentas", LentaSchema);