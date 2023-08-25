import { ClassModel } from "../models/Classmates.js"

// Create
export const createClass = async (req,res) => {
  try{
    const {img,name,surname,tg,insta,birthday,height,status,stuwor,tel} = req.body
    const newClass = new ClassModel({
      img,name,surname,tg,insta,birthday,height,status,stuwor,tel
    })
    const Classmate = await newClass.save();
    res.json(Classmate)
  }catch(err){
    res.json({msg:err})
  }
}
// Read
export const getClass = async (req,res) => {
  try{
    const Classmates = await ClassModel.find()
    res.json(Classmates)
  }catch(err){
    res.json(err);
  }
}
// Update
export const updateClass = async (req,res) => {
  const {id,img,name,surname,tg,insta,birthday,height,status,stuwor,tel} = req.body
  const updatingClass = await ClassModel.findOneAndUpdate({_id:id},{
    $set:{img,name,surname,tg,insta,birthday,height,status,stuwor,tel }
  })
  res.json(updatingClass)
}
// Delete
export const deleteClass = async (req,res) => {
  const {id} = req.params;
  const deletingClass = await ClassModel.findOneAndDelete({_id:id})
  res.json(deletingClass)
}