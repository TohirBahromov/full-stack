import React from 'react'
import "../error/error.css"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/footer"
import { Link } from 'react-router-dom'

export default function Error() {

  return (
    <>
      <div className="container">
        <div className="wrapper-error">
          <header>
            <Navbar />
          </header>
          <main>
            <div className="area">
              <div className="content">
                <h1>page not found</h1> 
                <Link to="/">
                  <span>back home</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
