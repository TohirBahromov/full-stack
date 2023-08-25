import {configureStore} from "@reduxjs/toolkit"
import classmatesSlice from "./classmatesSlice"
import commentUserSlice from "./commentUserSlice"
import adminPages from "./adminPages"
import crudModals from "./crudModals"
import setResponsive from "./setResponsive"
import userSlice from "./userSlice"
import allUsersSlice from "./allUsersSlice"

export default configureStore({
  reducer: {
    classmate : classmatesSlice,
    adminPages: adminPages,
    crudModals : crudModals,
    responsive : setResponsive,
    commentUser : commentUserSlice,
    user:userSlice,
    allUsers: allUsersSlice
  }
}) 