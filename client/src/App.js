import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import axios from "axios";
const Mainpage = lazy(()=> import("./pages/mainpage/mainpage"))
const Register = lazy(()=> import("./pages/register/register"))
const Login = lazy(()=> import("./pages/login/login"))
const Elon = lazy(()=> import("./pages/elonlar/elon"))
const Error = lazy(()=> import("./pages/error/error"))
const News = lazy(()=> import("./pages/news/news"))
const Singlenews = lazy(()=> import("./pages/news/singlenews"))
const Profile = lazy(()=> import("./pages/profile/profile"))
const Admin = lazy(()=> import("./pages/profile/profile"))
import Loading from "./utils/loading/loading";
import { useDispatch } from "react-redux";
import React, { useEffect, Suspense, lazy } from "react";
import { getUserInfo } from "./redux/userSlice";
function App() {

  axios.defaults.withCredentials = true;
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchMyData = async() =>{
      const {data:myData} = await axios.get("https://classmatesweb.onrender.com/api/auth/profile")
      dispatch(getUserInfo(myData))
    }
    fetchMyData()
  },[dispatch])

  return (
    <>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Mainpage />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/announcements/:id" element={<Elon />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<Singlenews />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/dashboard" element={<Admin />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
}

export default App;
