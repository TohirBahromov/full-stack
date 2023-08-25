import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active:"1"
}

const adminPages = createSlice({
  name:"adminPages",
  initialState,
  reducers:{
    setActive : (state,action)=>{
      state.active = action.payload.id
    }
  }
})

export const { setActive } = adminPages.actions;
export default adminPages.reducer;