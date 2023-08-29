import React from 'react'
import "../admins/adminComponent.css"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createModalOpen, createModalClose, updateModalOpen, updateModalClose, deleteModalOpen, deleteModalClose } from "../../../redux/crudModals"
import axios from "axios"
import useFetch from '../../../hooks/useFetch'
import Loading from '../../../utils/loading/loading'

export default function Classmates() {

  const dispatch = useDispatch()
  const {createModal,updateModal,deleteModal} = useSelector(state => state.crudModals)
  const {data,loading,reFetch} = useFetch("/api/classmate")

  const newDatas = [...data].reverse()
  const [formData, setFormData] = useState({
    classId:"",
    className:"",
    classSurname:"",
    classTg:"",
    classInsta:"",
    classBirthday:"",
    classHeight:"",
    classStatus:"",
    classStuwor:"",
    classphone:"",
  })
  const [file,setFile] = useState(undefined)

  const upload = async () => {
    try{
      const formdata = new FormData()
      formdata.append("file", file)
      const res = await axios.post("/api/upload",formdata)
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
    setFormData({
      classId:"",
      className:"",
      classSurname:"",
      classTg:"",
      classInsta:"",
      classBirthday:"",
      classHeight:"",
      classStatus:"",
      classStuwor:"",
      classphone:"",
    })
    setFile(undefined)
  }
  function uModalOpen (id,img,name,surname,tg,insta,birth,height,status,stuwor,phone) {
    dispatch(updateModalOpen())
    setFormData({
      classId:id,
      className:name,
      classSurname:surname,
      classTg:tg,
      classInsta:insta,
      classBirthday:birth,
      classHeight:height,
      classStatus:status,
      classStuwor:stuwor,
      classphone:phone,
    })
    setFile(img)
  }
  const uModalClose = () => {
    dispatch(updateModalClose())
    setFormData({
      classId:"",
      className:"",
      classSurname:"",
      classTg:"",
      classInsta:"",
      classBirthday:"",
      classHeight:"",
      classStatus:"",
      classStuwor:"",
      classphone:"",
    })
    setFile(undefined)
  }
  const dModalOpen = (id) => {
    setFormData(prev => {
      return{
        ...prev,
        classId:id
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
    const res = await axios.post("/api/classmate", {
      img: imgUrl,
      name:formData.className,
      surname:formData.classSurname,
      tg: formData.classTg,
      insta: formData.classInsta,
      birthday: formData.classBirthday,
      height:formData.classHeight,
      status: formData.classStatus,
      stuwor: formData.classStuwor,
      tel: formData.classphone
    })
    console.log(res)
    dispatch(createModalClose())
    setFormData({
      classId:"",
      className:"",
      classSurname:"",
      classTg:"",
      classInsta:"",
      classBirthday:"",
      classHeight:"",
      classStatus:"",
      classStuwor:"",
      classphone:"",
    })
    setFile(undefined)
    reFetch()
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    let imgUrl = "";
    if(file) imgUrl = await upload()
    const res = await axios.put("/api/classmate", {
      id:formData.classId,
      img:imgUrl,
      name:formData.className,
      surname:formData.classSurname,
      tg: formData.classTg,
      insta: formData.classInsta,
      birthday: formData.classBirthday,
      height:formData.classHeight,
      status: formData.classStatus,
      stuwor: formData.classStuwor,
      tel: formData.classphone
    })
    dispatch(updateModalClose())
    console.log(res)
    setFormData({
      classId:"",
      className:"",
      classSurname:"",
      classTg:"",
      classInsta:"",
      classBirthday:"",
      classHeight:"",
      classStatus:"",
      classStuwor:"",
      classphone:"",
    })
    setFile(undefined)
    reFetch()
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await axios.delete(`/api/classmate/${formData.classId}`)
    dispatch(deleteModalClose())
    console.log(res)
    setFormData({
      classId:"",
      className:"",
      classSurname:"",
      classTg:"",
      classInsta:"",
      classBirthday:"",
      classHeight:"",
      classStatus:"",
      classStuwor:"",
      classphone:"",
    })
    setFile(undefined)
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
                  <th>Image</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Tg</th>
                  <th>Insta</th>
                  <th>Birthday</th>
                  <th>Height</th>
                  <th>Status</th>
                  <th>Stuwor</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {newDatas.map(u => {
                  return(
                    <tr key={u._id}>
                      <td><div>{u._id}</div></td>
                      <td className='img'><div className="img-u"><img src={u.img && `https://class11a.up.railway.app/${u.img}`} alt="" /></div></td>
                      <td><div>{u.name}</div></td>
                      <td><div>{u.surname}</div></td>
                      <td><div>{u.tg}</div></td>
                      <td><div>{u.insta}</div></td>
                      <td><div>{u.birthday}</div></td>
                      <td><div>{u.height}</div></td>
                      <td><div>{u.status}</div></td>
                      <td><div>{u.stuwor}</div></td>
                      <td><div>{u.tel || "not entered"}</div></td>
                      <td className="action">
                        <div className="icons">
                          <div className="icon update" onClick={() => uModalOpen(u._id,u.img,u.name,u.surname,u.tg,u.insta,u.birthday,u.height,u.status,u.stuwor,u.tel)}>
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
                  <input type="file" className='file-field' placeholder='ann img' name='annImg' onChange={(e) => setFile(e.target.files[0])}   />
                  {file ? "File chosen" : "Choose a file"}
                </div>
                <input type="text" placeholder='classmate name' name='className' value={formData.className} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="text" placeholder='classmate surname' name='classSurname' value={formData.classSurname} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='classmate tg' name='classTg' value={formData.classTg} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='classmate insta' name='classInsta' value={formData.classInsta} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='classmate birthday' name='classBirthday' value={formData.classBirthday} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='classmate height' name='classHeight' value={formData.classHeight} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='classmate status' name='classStatus' value={formData.classStatus} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='classmate stuwor' name='classStuwor' value={formData.classStuwor} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='classmate phone' name='classphone' value={formData.classphone} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
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
                  {file ? "File chosen" : "Choose a file"}
                </div>
                <input type="text" placeholder='edit name' name='className' value={formData.className} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="text" placeholder='edit surname' name='classSurname' value={formData.classSurname} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='edit tg' name='classTg' value={formData.classTg} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='edit insta' name='classInsta' value={formData.classInsta} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='edit birthday' name='classBirthday' value={formData.classBirthday} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='edit height' name='classHeight' value={formData.classHeight} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='edit status' name='classStatus' value={formData.classStatus} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='edit stuwor' name='classStuwor' value={formData.classStuwor} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
                <input type="text" placeholder='edit phone' name='classphone' value={formData.classphone} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
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
