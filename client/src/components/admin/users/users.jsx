import React from 'react'
import "../admins/adminComponent.css"
import axios from 'axios'
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteModalOpen, deleteModalClose } from "../../../redux/crudModals"
import useFetch from "../../../hooks/useFetch"
import Loading from "../../../utils/loading/loading"

export default function Users() {

  const dispatch = useDispatch()
  const {data,loading,reFetch} = useFetch("https://classmatesweb.onrender.com/api/user")
  const {deleteModal} = useSelector(state => state.crudModals)
  const userInfo = useSelector(state => state.user)

  const [userId, setUserId] = useState("")
  const newDatas = [...data].reverse()

  const dModalOpen = (id)=> {
    setUserId(id)
    dispatch(deleteModalOpen())
  }
  const dModalClose = () => {
    dispatch(deleteModalClose())
  }

  // CRUD

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.delete(`https://classmatesweb.onrender.com/api/user/${userId}`).catch(err => console.log(err))
    dispatch(deleteModalClose())
    setUserId("")
    reFetch()
  }

  // console.log(formData);

  return (
    <>
      <div className="container">
        <div className="wrapper-admin_component">
          <div className="table">
            {loading ? <Loading /> : (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Tg</th>
                  <th>Insta</th>
                  <th>Bio</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {newDatas.map(u => {
                  return(
                    <tr key={u._id}>
                      <td><div>{u._id}</div></td>
                      <td><div>{u.name}</div></td>
                      <td className='img'>
                        <div className="img-u">
                          <img src={u.img && `https://classmatesweb.onrender.com/${u.img}`} alt="" />
                        </div>
                      </td>
                      <td><div>{u.email}</div></td>
                      <td><div>{u.password}</div></td>
                      <td><div>{u.telegram  || "not entered"}</div></td>
                      <td><div>{u.instagram || "not entered"}</div></td>
                      <td><div>{u.bio || "not entered"}</div></td>
                      <td className="action">
                        <div className="icons">
                          <div className="icon delete" onClick={() => dModalOpen(u._id)}>
                            <i className="fa-solid fa-trash delete"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            )}
          </div>
          
          {/* CRUD operations modals */}

          <div className={`delete-form ${!deleteModal && 'hidden'}`}>
            <div className="createone-rel">
              <div className="exit" onClick={dModalClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="exit-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="verify-action">
                You sure to delete this form ?
                <div className="verify-btns">
                  <div className="yes" onClick={handleDelete}>
                    I'm
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="no" onClick={dModalClose}>
                    Cancel
                    <i className="fa-solid fa-ban"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
