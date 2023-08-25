import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"userInfo",
  initialState:{
    data:null,
  },
  reducers:{
    getUserInfo:(state,action)=>{
      state.data = action.payload
    }
  },
})

export const { getUserInfo } = userSlice.actions;
export default userSlice.reducer;