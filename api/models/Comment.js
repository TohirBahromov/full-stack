import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  sender:String,
  senderImg:String,
  text:String,
},{timestamps:true})

export const CommentModel = mongoose.model("Comments", CommentSchema);