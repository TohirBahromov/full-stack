import { LentaModel } from "../models/Lentas.js"

// Create
export const createLenta = async (req,res) => {
  try{
    const {title,img,text} = req.body
    const newLenta = new LentaModel({
      title,
      img,
      text
    })
    console.log(`${hours} / ${date}`);
    const Lenta = await newLenta.save();
    res.json(Lenta)
  }catch(err){
    res.json({msg:err})
  }
}
// Read
export const getLenta = async (req,res) => {
  try{
    const Lentas = await LentaModel.find()
    res.json(Lentas)
  }catch(err){
    res.json(err);
  }
}
// Update
export const updateLenta = async (req,res) => {
  const {id,title,text,img} = req.body
  const updatingLenta = await LentaModel.findOneAndUpdate({_id:id},{
    $set:{title:title,img:img,text:text }
  })
  res.json(updatingLenta)
}
// Delete
export const deleteLenta = async (req,res) => {
  const {id} = req.params;
  console.log(id);
  const deletingLenta = await LentaModel.findOneAndDelete({_id:id})
  res.json(deletingLenta)
}