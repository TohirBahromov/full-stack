import { AdminModel } from "../models/Admins.js"

// Create
export const createAdmin = async (req,res) => {
  try{
    const {name, signId,password, phone} = req.body
    const newAdmin = new AdminModel({
      signId:signId,
      name:name,
      password:password,
      phone:phone
    })
    const Admin = await newAdmin.save()
    res.json(Admin)
  }catch(err){
    console.log(err);
  }
}
// Read
export const getAdmin = async (req,res) => {
  const Admins = await AdminModel.find()
  res.status(200).json(Admins)
}
// Update
export const updateAdmin = async (req,res) => {
  const {id,signId,name,password,phone} = req.body
  const updatingAdmin = await AdminModel.findOneAndUpdate({_id:id},{
    $set:{name:name,signId:signId,password:password,phone:phone}
  })
  res.status(200).json(updatingAdmin)
}
// Delete
export const deleteAdmin = async (req,res) => {
  try{
    const {id} = req.params
    const deletingAdmin = await AdminModel.findOneAndDelete({_id:id})
    res.status(200).json(deletingAdmin)
  }catch(err){
    res.json({success:false})
  }
}