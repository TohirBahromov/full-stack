import React,{ useState } from 'react'
import "../admin/admin.css"
import logo from "../../images/logo.png"
import Home from "../../components/admin/home/home"
import Navbar from '../../components/admin/navbar/navbar'
import AdminComponent from '../../components/admin/admins/adminComponent'
import Users from '../../components/admin/users/users'
import { Link } from "react-router-dom"
import admindashlinks from '../../sources/admindashlinks'
import { useSelector, useDispatch } from "react-redux"
import { setActive } from '../../redux/adminPages'
import Anns from '../../components/admin/anns/anns'
import Lentas from '../../components/admin/lentas/lentas'
import Advs from '../../components/admin/advs/advs'
import Classmates from '../../components/admin/classmates/classmates'
import CommentsAdmin from '../../components/admin/comments/commentsAdmin'
import useFetch from '../../hooks/useFetch'

export default function Admin() {

  const [isClosed, setIsClosed] = useState(false)
  const [isResp, setIsResp] = useState(false)
  const {data} = useFetch("https://classmatesweb.onrender.com/api/user")
  const myData = useSelector(state => state.user)
  const myUser = data?.find(d => d._id === myData?.data.userId)

  const dispatch = useDispatch()
  const {responsive} = useSelector(state => state.responsive)
  const { active } = useSelector(state => state.adminPages)
  const {createModal,updateModal,deleteModal } = useSelector(state => state.crudModals)

  function setClosed(){
    setIsClosed(prev => !prev)
  }
  function setResponsiveSidebarOp(){
    setIsResp(true)
  }
  function setResponsiveSidebarCl(){
    setIsResp(false)
  }
  const handleActive = (id) => {
    dispatch(setActive({id}))
  }
  document.querySelectorAll(".sidebar.resp > .website-elements > ul > li")?.forEach(li => {
    li.addEventListener("click", function(){
      setIsResp(false)
    })
  })
  function modalBody(){
    if(responsive){
      document.querySelector("body").style.overflow = "hidden"
    }else{
      document.querySelector("body").style.overflow = "initial"
    }
  }
  modalBody()

  return (
    <>
      <div className={`wrapper-admin ${createModal && "wrapper-backdrop" || updateModal && "wrapper-backdrop" || deleteModal && "wrapper-backdrop" || isResp && "wrapper-backdrop"}`}>
        <div className={`sidebar ${isClosed ? 'close' : ""} ${isResp && 'resp'}`}>
          <div className="sidebar-head">
            <div className="name-brand">
              <Link to="/">
                <div className="logo">
                  <img src={logo} alt="" />
                </div>   
              </Link>
              <h3>11 - A</h3>
            </div>
            <div className="resp-hamburger toggle-sidebar" onClick={setResponsiveSidebarCl}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="website-elements">
            <ul>
              {admindashlinks.map(a => {
                return(
                  <li className={active === a.id ? 'active' : ""} key={a.id} onClick={() => handleActive(a.id)}>
                    <a>
                      <div className="icon">
                        <i className={`fa-solid ${a.icon}`}></i>
                      </div>
                      <div className="txt">{a.model}</div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="admin-prof">
            <div className="prof-img">
              <div className="img">
                <img src={myUser?.img && `https://classmatesweb.onrender.com/${myUser?.img}`} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="main-screen">
          <Navbar event={setClosed} res={setResponsiveSidebarOp} />
          {active === "1" && (
            <Home />
          )}
          {active === "2" && (
            <AdminComponent />
          )}
          {active === "3" && (
            <Users />
          )}
          {active === "4" && (
            <Anns />
          )}
          {active === "5" && (
            <Lentas />
          )}
          {active === "6" && (
            <Advs />
          )}
          {active === "7" && (
            <Classmates />
          )}
          {active === "8" && (
            <CommentsAdmin />
          )}
        </div>
      </div>
    </>
  )
}
