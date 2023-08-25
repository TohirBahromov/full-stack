import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
  name:"allUsersInfo",
  initialState:{
    data:null,
  },
  reducers:{
    getAllUsersInfo:(state,action)=>{
      state.data = action.payload
    }
  },
})

export const { getAllUsersInfo } = allUsersSlice.actions;
export default allUsersSlice.reducer;