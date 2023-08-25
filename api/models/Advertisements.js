import mongoose from "mongoose";

const AdvsSchema = new mongoose.Schema({
  img: String,
},)

export const AdvsModel = mongoose.model("Advertisements", AdvsSchema);