import React from 'react'
import "../admins/adminComponent.css"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteModalOpen, deleteModalClose } from "../../../redux/crudModals"
import axios from "axios"
import useFetch from '../../../hooks/useFetch'
import Loading from '../../../utils/loading/loading'

export default function CommentsAdmin() {

  const dispatch = useDispatch()
  const {createModal,updateModal,deleteModal} = useSelector(state => state.crudModals)
  const {data,loading,error,reFetch} = useFetch("http://localhost:8800/api/comment")
  const setTimeAttrs = (hours) => {
    if(hours - 5 < 5){
      return `0${hours}`
    }else if(hours - 5 >= 5 && hours - 5 < 19){
      return hours
    }else if(hours - 5 >= 19){
      return `0${hours - 24}`
    }
  }
  const changeDate = (time) => {
    const date = typeof(time) === "string" && time.split("T")[0].replace(/-/g,".")
    const hours = typeof(time) === "string" && time.split("T")[1].split(".")[0].slice(0,5)
    const onlyHour = Number(typeof(hours) === "string" && hours.split(":")[0]) + 5
    const uzbHours = String(setTimeAttrs(onlyHour) + ":" + (typeof(hours) === "string" && hours.split(":")[1]))
    return `${uzbHours} / ${date}`
  }

  const newDatas = [...data].reverse()
  const [formData, setFormData] = useState({
    comId:"",
    comSender:"",
    comtext:"",
    comDate:"",
  })
  const [file,setFile] = useState(undefined)

  const upload = async () => {
    try{
      const formdata = new FormData()
      formdata.append("file", file)
      const res = await axios.post("http://localhost:8800/api/upload",formdata)
      return res.data
    }catch(err){
      console.log(err);
    }
  }

  const dModalOpen = (id) => {
    setFormData(prev => {
      return{
        ...prev,
        comId:id
      }
    })
    dispatch(deleteModalOpen())
  }
  const dModalClose = () => {
    dispatch(deleteModalClose())
  }

  // CRUD operation

  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await axios.delete(`http://localhost:8800/api/comment/${formData.comId}`)
    dispatch(deleteModalClose())
    setFormData({
      comId:"",
      comSender:"",
      comtext:"",
      comDate:"",
    })
    setFile(undefined)
    reFetch()
  } 

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
                  <th>Image</th>
                  <th>Sender</th>
                  <th>Text</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {newDatas.map(u => {
                  return(
                    <tr key={u._id}>
                      <td><div>{u._id}</div></td>
                      <td className='img'><div className="img-u"><img src={u.senderImg && `http://localhost:8800/${u.senderImg}`} alt="" /></div></td>
                      <td><div>{u.sender}</div></td>
                      <td><div>{u.text}</div></td>
                      <td><div>{u.createdAt && changeDate(u.createdAt.toString())}</div></td>
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
