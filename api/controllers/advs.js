import { AdvsModel } from "../models/Advertisements.js"

// Create
export const createAds = async (req,res) => {
  try{
    const {img} = req.body
    const newAdv = new AdvsModel({
      img
    })
    const Adv = await newAdv.save();
    res.json(Adv)
  }catch(err){
    res.json({msg:err})
  }
}
// Read
export const getAds = async (req,res) => {
  try{
    const Advs = await AdvsModel.find()
    res.json(Advs)
  }catch(err){
    res.json(err);
  }
}
// Delete
export const deleteAds = async (req,res) => {
  const {id} = req.params;
  console.log(id);
  const deletingAdv = await AdvsModel.findOneAndDelete({_id:id})
  res.json(deletingAdv)
}