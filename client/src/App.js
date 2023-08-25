import {BrowserRouter, Routes, Route} from "react-router-dom";
import axios from "axios";
import Mainpage from "./pages/mainpage/mainpage";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Elon from "./pages/elonlar/elon";
import Error from "./pages/error/error";
import News from "./pages/news/news";
import Singlenews from "./pages/news/singlenews";
import Profile from "./pages/profile/profile";
import Admin from "./pages/admin/admin";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
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
  },[])

  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
