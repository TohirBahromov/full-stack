import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createModal : false,
  updateModal : false,
  deleteModal : false
}

const crudModals = createSlice({
  name:"crudModals",
  initialState,
  reducers:{
    createModalOpen: (state) => {
      state.createModal = true
    },
    createModalClose: (state) => {
      state.createModal = false;
    },
    updateModalOpen: (state) => {
      state.updateModal = true
    },
    updateModalClose: (state) => {
      state.updateModal = false
    },
    deleteModalOpen: (state) => {
      state.deleteModal = true
    },
    deleteModalClose: (state) => {
      state.deleteModal = false
    }
  }
})

export const { createModalOpen, createModalClose, updateModalOpen, updateModalClose, deleteModalOpen, deleteModalClose } = crudModals.actions;
export default crudModals.reducer;