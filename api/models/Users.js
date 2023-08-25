import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name : {
    type:String,
    required:true
  },
  img: String,
  email:String,
  password:String,
  telegram:String,
  instagram:String,
  bio:String
})

export const UserModel = mongoose.model("Users", UserSchema);