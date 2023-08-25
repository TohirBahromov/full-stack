import { AnnModel } from "../models/Announcements.js"

// Create
export const createAnn = async (req,res) => {
  try{
    const {title,img,text} = req.body
    const newAnn = new AnnModel({
      title,
      img,
      text
    })
    const Announcement = await newAnn.save();
    res.json(Announcement)
  }catch(err){
    res.json({msg:err})
  }
}
// Read
export const getAnn = async (req,res) => {
  try{
    const Anns = await AnnModel.find()
    res.json(Anns)
  }catch(err){
    res.json(err);
  }
}
// Update
export const updateAnn = async (req,res) => {
  const {id,title,text,img} = req.body
  const updatingAnn = await AnnModel.findOneAndUpdate({_id:id},{
    $set:{title:title,img:img,text:text }
  })
  res.json(updatingAnn)
}
// Delete
export const deleteAnn = async (req,res) => {
  const {id} = req.params;
  const deletingAnn = await AnnModel.findOneAndDelete({_id:id})
  res.json(deletingAnn)
}