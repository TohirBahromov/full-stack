import { CommentModel } from "../models/Comment.js"

// Create
export const createComment = async (req,res) => {
  try{
    const {sender,senderImg,text} = req.body
    const newComment = new CommentModel({
      sender,
      senderImg,
      text,
    })
    const Comment= await newComment.save();
    res.json(Comment)
  }catch(err){
    res.json({msg:err})
  }
}
// Read
export const getComment = async (req,res) => {
  try{
    const Comments = await CommentModel.find()
    res.json(Comments)
  }catch(err){
    res.json(err);
  }
}
// Update
export const updateComment = async (req,res) => {
  const {id,text} = req.body
  const updatingComment = await CommentModel.findOneAndUpdate({_id:id},{
    $set:{text }
  })
  res.json(updatingComment)
}
// Delete
export const deleteComment = async (req,res) => {
  const {id} = req.params;
  const deletingComment = await CommentModel.findOneAndDelete({_id:id})
  res.json(deletingComment)
}