import { UserModel } from "../models/Users.js"

// Read
export const getUsers = async (req,res) => {
  try{
    const Users = await UserModel.find()
    res.json(Users)
  }catch(err){
    res.json({msg:err})
  }
}
// Update
export const updateUser = async (req,res) => {
  try{
    const {id,name,img,bio,telegram,instagram} = req.body
    const existingUser = await UserModel.findOne({name:name})
    if(existingUser){
      res.json("Foydalanuvchi nomi band.Boshqasini urinib ko'ring")
    }else{
      const updatingUser = await UserModel.findOneAndUpdate({_id:id},{
        $set:{name,img,bio,telegram,instagram}
      })
      res.json("success")
    }
  }catch(err){
    console.log(err);
  }
}
// Delete
export const deleteUser = async (req,res) => {
  try{
    const {id} = req.params
    const deletingUser = await UserModel.findOneAndDelete({_id:id})
    res.status(200).json(deletingUser)
  }catch(err){
    res.json({msg:err})
  }
}