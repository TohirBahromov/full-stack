import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sender:"",
  img:"",
  username:"",
  bio:"",
  tg:"",
  insta:"",
  isShown:false
}

const commentUserSlice = createSlice({
  name : "commentUserSlice",
  initialState,
  reducers:{
    selectUser:(state,action)=>{
      state.sender = action.payload.sender
      state.img = action.payload.img
      state.username = action.payload.username
      state.bio = action.payload.bio
      state.tg = action.payload.tg
      state.insta = action.payload.insta
      state.isShown = true
    },
    unSelectUser:(state)=>{
      state.sender = ""
      state.img = ""
      state.username = ""
      state.bio = ""
      state.tg = ""
      state.insta = ""
      state.isShown = false
    }
  }
})

export const { selectUser, unSelectUser } = commentUserSlice.actions;
export default commentUserSlice.reducer;