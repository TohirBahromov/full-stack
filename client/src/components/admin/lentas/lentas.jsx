import React from 'react'
import "../admins/adminComponent.css"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createModalOpen, createModalClose, updateModalOpen, updateModalClose, deleteModalOpen, deleteModalClose } from "../../../redux/crudModals"
import axios from "axios"
import useFetch from '../../../hooks/useFetch'
import Loading from '../../../utils/loading/loading'

export default function Lentas() {

  const dispatch = useDispatch()
  const {createModal,updateModal,deleteModal} = useSelector(state => state.crudModals)
  const {data,loading,reFetch} = useFetch("https://classmatesweb.onrender.com/api/lenta")
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
    annId:"",
    annTitle:"",
    annText:"",
  })
  const [file,setFile] = useState(undefined)

  const upload = async () => {
    try{
      const formdata = new FormData()
      formdata.append("file", file)
      const res = await axios.post("https://classmatesweb.onrender.com/api/upload",formdata)
      return res.data
    }catch(err){
      console.log(err);
    }
  }

  const cModalOpen = () => {
    dispatch(createModalOpen())
  }
  function cModalClose(){
    dispatch(createModalClose())
    setFormData({annId:"",annTitle:"",annText:""})
    setFile(undefined)
  }
  function uModalOpen (id,img,title,text) {
    dispatch(updateModalOpen())
    setFormData({
      annId : id,
      annTitle : title,
      annText : text,
    })
    setFile(img)
  }
  const uModalClose = () => {
    dispatch(updateModalClose())
    setFormData({
      annId : "",
      annTitle:"",
      annText : "",
    })
    setFile(undefined)
  }
  const dModalOpen = (id) => {
    setFormData(prev => {
      return{
        ...prev,
        annId:id
      }
    })
    dispatch(deleteModalOpen())
  }
  const dModalClose = () => {
    dispatch(deleteModalClose())
  }

  // CRUD operations

  const handleSubmit = async (e) => {
    e.preventDefault()
    let imgUrl = "";
    if(file) imgUrl = await upload()
    const res = await axios.post("https://classmatesweb.onrender.com/api/lenta", {
      title : formData.annTitle,
      text: formData.annText,
      img : imgUrl
    })
    console.log(res)
    dispatch(createModalClose())
    setFormData({annId:"",annTitle:"",annText:""})
    setFile(undefined)
    reFetch()
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    let imgUrl = "";
    if(file) imgUrl = await upload()
    const res = await axios.put("https://classmatesweb.onrender.com/api/lenta", {
      id : formData.annId,
      title : formData.annTitle,
      text: formData.annText,
      img : imgUrl
    })
    console.log(res)
    dispatch(updateModalClose())
    setFormData({annId:"",annTitle:"",annText:""})
    setFile(undefined)
    reFetch()
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await axios.delete(`https://classmatesweb.onrender.com/api/lenta/${formData.annId}`)
    dispatch(deleteModalClose())
    setFormData({annId:"",annTitle:"",annText:""})
    setFile(undefined)
    reFetch()
    console.log(res)
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
                  <th>Image</th>
                  <th>Title</th>
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
                      <td className='img'><div className="img-u"><img src={u.img && `https://classmatesweb.onrender.com/${u.img}`} alt="" /></div></td>
                      <td><div>{u.title}</div></td>
                      <td><div>{u.text}</div></td>
                      <td><div>{u.createdAt && changeDate(u.createdAt.toString())}</div></td>
                      <td className="action">
                        <div className="icons">
                          <div className="icon update" onClick={() => uModalOpen(u._id,u.img,u.title,u.text)}>
                            <i className="fa-regular fa-pen-to-square update"></i>
                          </div>
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
          <div className="create-content" onClick={cModalOpen}>
            <div>
              Create one
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
          
          {/* CRUD operations modals */}

          <div className={`createone-form ${!createModal && 'hidden'}`}>
            <div className="createone-rel">
              <div className="exit" onClick={cModalClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="exit-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <fieldset>
                <div className="file_ch">
                  <input type="file" className='file-field' placeholder='lenta img' name='file' onChange={(e) => setFile(e.target.files[0])}   />
                  {file ?  "File chosen" : "Choose a file"}
                </div>
                <input type="text" placeholder='lenta title' name='annTitle' value={formData.annTitle} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="text" placeholder='lenta text' name='annText' value={formData.annText} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="submit" value="create" onClick={handleSubmit} />
              </fieldset>
            </div>
          </div>
          <div className={`edit-form ${!updateModal && 'hidden'}`}>
            <div className="createone-rel">
              <div className="exit" onClick={uModalClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="exit-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <fieldset>
                <div className="file_ch">
                  <input type="file" placeholder='edit img' name='file' onChange={(e) => setFile(e.target.files[0])}  />
                  {file ?  "File chosen" : "Choose a file"}
                </div>
                <input type="text" placeholder='edit title' name='annTitle' value={formData.annTitle} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="text" placeholder='edit text' name='annText' value={formData.annText} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="submit" value="update" onClick={handleUpdate} />
              </fieldset>
            </div>
          </div>
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
