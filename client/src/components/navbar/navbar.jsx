import React from 'react'
import "../../components/navbar/navbar.css";
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setModal} from "../../redux/setResponsive"
import useFetch from '../../hooks/useFetch';

export default function Navbar() {

  const dispatch = useDispatch()
  const {responsive} = useSelector(state => state.responsive)
  const myData = useSelector(state => state.user)
  const {data:adminDatas} = useFetch("https://classmatesweb.onrender.com/api/admin")

  function handleModal(){
    dispatch(setModal())
  }
  return (

    <>
      <div className="navbar_lines mb-4">
        <div className="st-navbar">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </Link>
          <div className="reg-log">
            {myData?.data !== "no token" ? "" : (
              <Link to="/register">
              <h2>Ro'yxatdan o'tish</h2>
              </Link>
            )}
            {myData?.data !== "no token" ? "" : (
              <Link to="/login">
                <h2>Akkauntga kirish</h2>
              </Link>
            )}
            {myData?.data === "no token" ? "" : (
              <Link to="/profile">
                <h2>Profilim</h2>
              </Link>
            )}
            {adminDatas?.find(d => d.signId === myData.data?.userId) && (
              <Link to="/admin/dashboard">
                <h2>Adminlar bo'limi</h2>           
              </Link>
            )}
          </div>
          <div className="toggle-hamburger" onClick={handleModal}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
        <div className={`responsive-menu_modal ${responsive ? "true" : ""}`}>
            <ul>
              {myData?.data !== "no token" ? "" : (
                <Link to="/register" onClick={handleModal}>
                  <li>Ro'yxatdan o'tish</li>
                </Link>
              )}
              {myData?.data !== "no token" ? "" : (
                <Link to="/login" onClick={handleModal}>
                  <li>Akkauntga kirish</li>
                </Link>
              )}
              {myData?.data === "no token" ? "" : (
                <Link to="/profile" onClick={handleModal}>
                  <li>Profilim</li>
                </Link>
              )}
              {adminDatas?.find(d => d.signId === myData.data?.userId) &&(
                <Link to="/admin/dashboard" onClick={handleModal}>
                  <li>Adminlar bo'limi</li>
                </Link>
              )}
            </ul>
          </div>
      </div>
    </>
  )
}
