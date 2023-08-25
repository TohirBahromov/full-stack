import React, { useState, useEffect } from 'react'
import "../navbar/navbar.css"

export default function Navbar({event,res}) {

  const [windowDimension, setWindowDimension] = useState({
    windowWidth : window.innerWidth,
    windowHeight : window.innerHeight
  })
  const detectSize = () => {
    setWindowDimension({
      windowWidth : window.innerWidth,
      windowHeight : window.innerHeight
    })
  }
  useEffect(()=>{
    window.addEventListener("resize", detectSize)
    return ()=>{
      window.removeEventListener("resize", detectSize)
    }
  },[windowDimension])

  return (
    <>
      <nav>
        <div className="admin-nav_elements">
          <div className="toggle-sidebar" style={{display: windowDimension.windowWidth <= 1160 ? "none" : "flex"}} onClick={event}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="toggle-sidebar res" style={{display: windowDimension.windowWidth <= 1160 ? "flex" : "none"}} onClick={res}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="search-input_admin">
            <input type="text" placeholder='search' />
            <div className="searching">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
