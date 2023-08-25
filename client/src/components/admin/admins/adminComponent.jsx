import { useState } from "react"
import "../admins/adminComponent.css"
import { useSelector, useDispatch } from "react-redux"
import { createModalOpen, createModalClose, updateModalOpen, updateModalClose, deleteModalOpen, deleteModalClose } from "../../../redux/crudModals"
import axios from "axios"
import useFetch from "../../../hooks/useFetch"
import Loading from "../../../utils/loading/loading"

export default function AdminComponent() {

  const dispatch = useDispatch()
  const {createModal,updateModal,deleteModal} = useSelector(state => state.crudModals)
  const {data,loading,error,reFetch} = useFetch("https://classmatesweb.onrender.com/api/admin")

  const [formData, setFormData] = useState({
    adminId:"",
    adminSignId:"",
    adminname:"",
    adminpassword:"",
    adminphone:""
  })
  const cModalOpen = () => {
    dispatch(createModalOpen())
  }
  function cModalClose(){
    dispatch(createModalClose())
    setFormData({adminId:"",adminSignId:"",adminname:"",adminpassword:"",adminphone:""})
  }
  function uModalOpen (id,signId,name,pass,phone) {
    dispatch(updateModalOpen())
    setFormData({
      adminId:id,
      adminSignId:signId,
      adminname:name,
      adminpassword:pass,
      adminphone:phone
    })
  }
  const uModalClose = () => {
    dispatch(updateModalClose())
    setFormData({
      adminId:"",
      adminSignId:"",
      adminname:"",
      adminpassword:"",
      adminphone:""
    })
  }
  const dModalOpen = (id) => {
    dispatch(deleteModalOpen())
    setFormData(prev => {
      return{
        ...prev,
        adminId:id
      }
    })
  }
  const dModalClose = () => {
    dispatch(deleteModalClose())
    setFormData({adminId:"",adminSignId:"",adminname:"",adminpassword:"",adminphone:""})
  }

  // CRUD operations
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post("https://classmatesweb.onrender.com/api/admin", {
      signId:formData.adminSignId,
      name:formData.adminname,
      password:formData.adminpassword,
      phone:formData.adminphone
    })
    dispatch(createModalClose())
    setFormData({adminId:"",adminSignId:"",adminname:"",adminpassword:"",adminphone:""})
    reFetch()
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const res = await axios.put("https://classmatesweb.onrender.com/api/admin", {
      id:formData.adminId,
      signId:formData.adminSignId,
      name:formData.adminname,
      password:formData.adminpassword,
      phone:formData.adminphone
    })
    dispatch(updateModalClose())
    setFormData({adminId:"",adminSignId:"",adminname:"",adminpassword:"",adminphone:""})
    reFetch()
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.delete(`https://classmatesweb.onrender.com/api/admin/${formData.adminId}`).catch(err => console.log(err))
    dispatch(deleteModalClose())
    setFormData({adminId:"",adminSignId:"",adminname:"",adminpassword:"",adminphone:""})
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
                  <th>Signed ID</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  {data.map(admin => {
                    return(
                      <tr key={admin._id}>
                        <td><div>{admin._id}</div></td>
                        <td><div>{admin.name}</div></td>
                        <td><div>{admin.signId}</div></td>
                        <td><div>{admin.password}</div></td>
                        <td><div>{admin.phone}</div></td>
                        <td className="action">
                          <div className="icons">
                            <div className="icon update" onClick={() => uModalOpen(admin._id,admin.signId,admin.name,admin.password,admin.phone)}>
                              <i className="fa-regular fa-pen-to-square update"></i>
                            </div>
                            <div className="icon delete" onClick={() => dModalOpen (admin._id)}>
                              <i className="fa-solid fa-trash delete"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                  }
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
                <input type="text" placeholder='new admin' value={formData.adminname} name='adminname' onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="text" placeholder='new adminID' value={formData.adminSignId} name='adminSignId' onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="password" placeholder='admin password' value={formData.adminpassword} name='adminpassword' onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="number" placeholder='admin phone' name='adminphone' value={formData.adminphone} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
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
                <input type="text" placeholder='edit admin' name='adminname' value={formData.adminname} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="text" placeholder='edit adminID' name='adminSignId' value={formData.adminSignId} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="password" placeholder='edit password' name='adminpassword' value={formData.adminpassword} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})}  />
                <input type="number" placeholder='edit phone' name='adminphone' value={formData.adminphone} onChange={(e) => setFormData(prev => {return {...prev, [e.target.name] : e.target.value}})} />
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
