import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:"",
  img:"",
  surname:"",
  birthday:"",
  height:"",
  status:"",
  stuwor:"",
  tel:"",
  isShown:false
}

export const classmateSlice = createSlice({
  name :"classmates",
  initialState,
  reducers:{
    selectClassmate: (state, action) => {
      state.name = action.payload.name
      state.img = action.payload.img
      state.surname = action.payload.surname
      state.birthday = action.payload.birthday
      state.height = action.payload.height
      state.status = action.payload.status
      state.stuwor = action.payload.stuwor
      state.tel = action.payload.tel
      state.isShown = true
    },
    unselectClassmate: (state) => {
      return {name:"", img:"", surname:"", birthday:"", height:"",status:"", stuwor:"", tel:"", isShown : false}
    }
  }
})

export const { selectClassmate, unselectClassmate } = classmateSlice.actions;
export default classmateSlice.reducer;