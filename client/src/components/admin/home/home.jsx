import React from 'react'
import "../home/home.css"
import useFetch from '../../../hooks/useFetch'

export default function Home() {

  const {data:users} = useFetch("/api/user")
  const {data:comments} = useFetch("/api/comment")
  const {data:ann} = useFetch("/api/announcement")
  const {data:lenta} = useFetch("/api/lenta")

  return (
    <>
    <div className="container">
      <div className="wrapper-admin_home">
        <div className="analytics">
          <div className="analytic-block">
            <div className="txt">
              <h3>3 k</h3>
              Website visitors
            </div>
            <div className="icon">
              <i className="fa-solid fa-eye"></i>
            </div>
          </div>  
          <div className="analytic-block">
            <div className="txt">
              <h3>{users?.length}</h3>
              Registered users
            </div>
            <div className="icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
          </div>
          <div className="analytic-block">
            <div className="txt">
              <h3>{comments?.length}</h3>
              Users comments
            </div>
            <div className="icon">
              <i className="fa-solid fa-comment"></i>
            </div>
          </div>
          <div className="analytic-block">
            <div className="txt">
              <h3>{lenta?.length + ann?.length}</h3>
              Posts
            </div>
            <div className="icon">
              <i className="fa-solid fa-file-pen"></i>
            </div>  
          </div>
        </div>
        <div className="msg">
          Welcome to Admin Dashboard
        </div>
        <div className="statistics-container">
          <div className="heading-sta">
            Percentage of users visiting last week
          </div>
          <div className="statistics-bar">
            <div className="regs" style={{width:"67%"}}>
              Registreted 67%
            </div>
            <div className="unregs">
              Unregistreted 33%
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
