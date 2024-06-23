import "../admins/adminComponent.css"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createModalOpen, createModalClose, deleteModalOpen, deleteModalClose } from "../../../redux/crudModals"
import axios from "axios"
import useFetch from '../../../hooks/useFetch'
import Loading from "../../../utils/loading/loading"

export default function Advs() {

  const dispatch = useDispatch()
  const {createModal,deleteModal} = useSelector(state => state.crudModals)
  const {data,loading,reFetch} = useFetch("/api/advertisement")

  const newDatas = [...data].reverse()
  const [formData, setFormData] = useState({
    adsId:"",
  })
  const [file,setFile] = useState()

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
    setFormData({adsId:""})
    setFile(undefined)
  }
  const dModalOpen = (id) => {
    setFormData(prev => {
      return{
        ...prev,
        adsId:id
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
    const res = await axios.post("/api/advertisement", {
      img : imgUrl
    })
    console.log(res);
    dispatch(createModalClose())
    setFormData({annId:"",annTitle:"",annText:""})
    setFile(undefined)
    reFetch()
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await axios.delete(`/api/advertisement/${formData.adsId}`)
    dispatch(deleteModalClose())
    console.log(res)
    setFormData({adsId:""})
    setFile(undefined)
    reFetch()
  } 

  // console.log(formData);

  return (
    <>
      <div className="container">
        <div className="wrapper-admin_component adverts">
          <div className="table">
          {loading ? <Loading /> : (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th className="img-header">Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {newDatas.map(u => {
                  return(
                    <tr key={u._id}>
                      <td><div>{u._id}</div></td>
                      <td className='img'><div className="img-u"><img src={u.img && `https://class11a.onrender.com/${u.img}`} alt="" /></div></td>
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
                  <input type="file" className='file-field' name='file' onChange={(e) => setFile(e.target.files[0])}   />
                  {file ? "File Chosen" : "Choose a file"}
                </div>
                <input type="submit" value="create" onClick={handleSubmit} />
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
