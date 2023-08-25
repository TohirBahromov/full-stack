import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responsive:false
}

const setResponsive = createSlice({
  name : "responsive",
  initialState,
  reducers:{
    setModal:(state) =>{
      state.responsive = !state.responsive
    }
  }
})

export const { setModal} = setResponsive.actions;
export default setResponsive.reducer;