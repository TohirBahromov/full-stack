import React,{ useState, useRef } from 'react'
import "../comment/comment.css"
import galochka from "../../images/galochka.png"
import { useSelector,useDispatch } from "react-redux"
import { selectUser, unSelectUser } from "../../redux/commentUserSlice"
import useFetch from '../../hooks/useFetch'
import Loading from '../../utils/loading/loading'
import axios from 'axios'

export default function Comment() {

  const {data:commentsData,loading,reFetch} = useFetch("https://classmatesweb.onrender.com/api/comment")
  const {data:usersData} = useFetch("https://classmatesweb.onrender.com/api/user")
  const {data:myData} = useFetch("https://classmatesweb.onrender.com/api/auth/profile")
  const {data:adminsData} = useFetch("https://classmatesweb.onrender.com/api/admin")
  const isAdmin = adminsData?.find(d => d.signId === commentsData?.sender)
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
  
  const newCommentsData = [...commentsData].reverse()

  const focusInput = useRef(null)
  const dispatch = useDispatch()
  const commentedUser = useSelector(state => state.commentUser)

  const [isEditing, setIsEditing] = useState(null)
  const [newComment,setNewComment] = useState({
    commentId:"",
    comment:""
  })

  function editComment(commentId){
    setIsEditing(commentId)
    if(isEditing === commentId){
      setIsEditing(null)
    }
  }
  function inputFocus(id,text){
    setNewComment({commentId:id,comment:text})
    focusInput.current.focus()
    setIsEditing(null)
    document.querySelector(".comment-send").classList.add("hidden")
    document.querySelector(".comment-edit_s").classList.remove("hidden")
  }
  const selectCommentedUser = (sender) => {
    const commentedUser = usersData?.find(d => d._id === sender)
    const img = commentedUser.img
    const username = commentedUser.name
    const bio = commentedUser.bio
    const tg = commentedUser.telegram
    const insta = commentedUser.instagram
    dispatch(selectUser({sender,img,username,bio,tg,insta}))
    reFetch()
  }
  function unselectCommentedUser(){
    dispatch(unSelectUser())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(myData === "no token"){
      alert("Ooops, kommentariya qoldirish uchun avval ro'yxatdan o'ting!")
      setNewComment({
        commentId:"",
        comment:""
      })
    }else{
      if(newComment.comment === ""){
        alert("kamentariya kiritmagansiz")
      }else{
        const senderInfo = usersData?.find(u => u._id === myData?.userId)
        const res = await axios.post("https://classmatesweb.onrender.com/api/comment",{
          sender: myData?.userId,
          senderImg: senderInfo?.img,
          text: newComment.comment
        })
        console.log(res)
        setNewComment({
          commentId:"",
          comment:""
        })
        reFetch()
      }
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    if(newComment.comment === ""){
      alert("Kamentariya kiritmagansiz")
      document.querySelector(".comment-send").classList.remove("hidden")
      document.querySelector(".comment-edit_s").classList.add("hidden")
    }else{
      const res = await axios.put('https://classmatesweb.onrender.com/api/comment',{
        id:newComment.commentId,
        text:newComment.comment
      })
      console.log(res)
      setNewComment({
        commentId:"",
        comment:""
      })
      reFetch()
      document.querySelector(".comment-send").classList.remove("hidden")
      document.querySelector(".comment-edit_s").classList.add("hidden")
    }
  }
  const handleDelete = async (id) => {
    const res = await axios.delete(`https://classmatesweb.onrender.com/api/comment/${id}`)
    setIsEditing(null)
    reFetch()
    console.log(res)
  }

  const comment = newCommentsData.map(c => {
    return(
      <div className="comment" key={c._id}>
      <div className="user">
        <div className="img-user" onClick={() => selectCommentedUser(c.sender)}>
          <img src={usersData?.find(d => d._id === c.sender)?.img && `https://classmatesweb.onrender.com/${usersData?.find(d => d._id === c.sender)?.img}`} alt="" />
        </div>
        <div className="text-user">
          <p>{c.text}</p>
          {isAdmin && (
            <div className="img-galochka">
              <img src={galochka} alt="" />
            </div>
          )}
        </div>
        {c.sender === myData.userId && (
          <div className="editing-comment" onClick={()=> editComment(c._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="edit-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </div>
        )}
      </div>
      <div className="date-comment">
        <p>{c.createdAt && changeDate(c.createdAt.toString())}</p>
      </div>
      {/* Editing display block when icon is clicked */}
      <div className={`changing-list ${isEditing === c._id ? "d-block" : "d-none"}`}>
        <div className="delete pb-2" onClick={() => handleDelete(c._id)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="delete-i">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          <p>o'chirish</p>
        </div>
        <div className="edit pt-2" onClick={()=> inputFocus(c._id, c.text)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="edit-i">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          <p>tahrirlash</p>
        </div>
      </div>
    </div>
    )
  })

  return (
    <>
      <div className="comments">
        <div className="head_sp my-3">
          <h1 className="header_web">Foydalanuvchilar fikrlari</h1>
        </div>
        <div className="comments-area">
          <div className="all-comments">
            {loading ? <Loading /> : (
              <div className="comment-line">
                {loading ? <Loading /> : (
                  commentsData.length < 1 && (
                    <div className="no-comments">
                      Komentariyalar yo'q
                    </div>
                  )
                )}
                {comment}
              </div>
            )}
            <div className="my-comment">
              <input className='comment-input' type="text" name='comment'  placeholder='kommentariya qoldiring' ref={focusInput} value={newComment.comment} onChange={(e) => setNewComment(prev => {return {...prev, [e.target.name] : e.target.value}})} />
              <div className="comment-send" onClick={myData ? handleSubmit : handleUpdate}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="send-btn">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
              <div className="comment-edit_s hidden" onClick={handleUpdate}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="send-btn">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
            </div>
          </div>
          <div className="comments-icon"></div>
        </div>
        {/* User Profile Modal */}
        {commentedUser.isShown && (
          <div className="user-prof_modal">
            {loading ? <Loading /> : (
              <div className="wrapper-upm">
                <div className="header">
                  <div className="img">
                    <img src={commentedUser.img && `https://classmatesweb.onrender.com/${commentedUser.img}`} alt="" />
                  </div>
                  <div className="username">
                    <p>{commentedUser.username}</p>
                    {isAdmin && (
                      <p className="admin-hashtag">#admin</p>
                    )}
                  </div>
                </div>
                <div className="user-bio">
                  {commentedUser.bio === "" && (
                    <div className="no-bio">bio kiritilmagan</div>
                  )}
                  <p>{commentedUser.bio}</p>
                </div>
                <div className="user-socials">
                  {commentedUser.tg && (
                    <a target='_blank' rel='noreferrer' href={commentedUser.tg && `https://t.me/${commentedUser.tg}`}>
                      <div className="social tg">
                        <div className="icon">
                          <i className="fa-brands fa-telegram tg"></i>
                        </div>
                        <p>Telegramga o'tish</p>
                      </div>      
                    </a>
                  )}
                  {commentedUser.insta && (
                    <a target='_blank' rel='noreferrer' href={commentedUser.insta && `https://instagram.com/${commentedUser.insta}`}>
                      <div className="social insta">
                        <div className="icon">
                          <i className="fa-brands fa-square-instagram insta"></i>
                        </div>
                        <p>Instagramga o'tish</p>
                      </div>
                    </a>
                  )}
                </div>
                <div className="exit" onClick={unselectCommentedUser}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="exit-svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
