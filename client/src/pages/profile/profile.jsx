import React,{useState} from 'react'
import "../profile/profile.css"
import { Link } from "react-router-dom"
import logo from "../../images/logo.png"
import {useSelector} from "react-redux"
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import Loading from '../../utils/loading/loading'

export default function Profile() {

  const {data:usersData,loading,reFetch} = useFetch("https://classmatesweb.onrender.com/api/user")
  const {data:myData} = useSelector(state => state.user)
  const myInfo = usersData?.find(d => d._id === myData?.userId)

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

  const [isShownNick,setIsShownnick] = useState(false)
  const [isShownBio,setIsShownBio] = useState(false)
  const [isShownTg, setIsShownTg] = useState(false)
  const [isShownInsta, setIsShownInsta] = useState(false)
  const [newNickname, setNewNickname] = useState("")
  const [newBio, setNewBio] = useState("")
  const [newInsta,setNewInsta] = useState("")
  const [newTg,setNewTg] = useState("")
  const [file,setFile] = useState()
  const {responsive} = useSelector(state => state.responsive)

  function modalBody(){
    if(responsive){
      document.querySelector("body").style.overflow = "hidden"
    }else{
      document.querySelector("body").style.overflow = "initial"
    }
  }
  modalBody()

  // Updating all necessary datas

  const submitImg = async (e) => {
    e.preventDefault()
    let imgUrl = "";
    if(file) imgUrl = await upload()
    const res = await axios.put("https://classmatesweb.onrender.com/api/user", {
      id:myData?.userId,
      img:imgUrl
    })
    console.log(res)
    reFetch()
    setFile(undefined)
  }
  const submitName = async (e) => {
    e.preventDefault()
    const res = await axios.put("https://classmatesweb.onrender.com/api/user", {
      id:myData?.userId,
      name:newNickname
    })
    console.log(res)
    reFetch()
    setIsShownnick(false)
  }
  const submitBio = async (e) => {
    e.preventDefault()
    const res = await axios.put("https://classmatesweb.onrender.com/api/user", {
      id:myData?.userId,
      bio:newBio
    })
    console.log(res);
    reFetch()
    setIsShownBio(false)
  }
  const submitTg = async (e) => {
    e.preventDefault()
    const res = await axios.put("https://classmatesweb.onrender.com/api/user", {
      id:myData?.userId,
      telegram:newTg
    })
    console.log(res)
    reFetch()
    setIsShownTg(false)
  }
  const submitInsta = async (e) => {
    e.preventDefault()
    const res = await axios.put("https://classmatesweb.onrender.com/api/user", {
      id:myData?.userId,
      instagram:newInsta
    })
    console.log(res)
    reFetch()
    setIsShownInsta(false)
  }

  return (
    <>
    <div className={`wrapper-profile ${(isShownBio && `wrapper-backdrop`) || (isShownNick && `wrapper-backdrop`) || (isShownTg && `wrapper-backdrop`) || (isShownInsta && `wrapper-backdrop`)}`}>
      <header>
        <div className="container">
          <div className="register--header">
            <Link to="/">
              <div className="logo-line-register">
                <img src={logo} alt='' width="117" height="48" />
              </div>
            </Link>
            <div className="go-singIn">
              {`Account > Sozlash`}
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          {loading ? <Loading /> : (
            <div className="account-setting_cont">
              <div className="account-setting_wind">
                <div className="logo-profile_b">
                  <div className="logo">
                    <img src={myInfo?.img && `https://classmatesweb.onrender.com/${myInfo.img}`} alt="" />
                    {file && (
                    <div className="editing-svg_prof" onClick={submitImg}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </div>
                    )}
                    <input type="file" name='file' id='prof-img_upload' title='fayl tanlang' onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                  <div className="my-id">
                    ID : {myInfo?._id}
                  </div>
                </div>
                <div className="bio">
                  <span className='d-block ps-3 mb-1 pb-1'>Bio</span>
                  {myInfo?.bio ? myInfo.bio : (
                    <div className="no-bio">
                      bio kiritilmagan
                    </div>
                  )}
                </div>
                <div className="content-profile_b">
                  <div className='content' onClick={() => setIsShownnick(prev => !prev)}>
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p>Username</p>
                    <div className="current-details">
                      <h3>
                        {myInfo?.name}
                      </h3>
                    </div>
                  </div>
                  <div className='content' onClick={() => setIsShownBio(prev => !prev)}>
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </div>
                    <p>Bio</p>
                    <div className='current-details'>
                      <h3>
                        {myInfo?.bio ? myInfo.bio : "bio qo'shing"}
                      </h3>
                    </div>
                  </div>
                  <div className='content' onClick={() => setIsShownTg(prev => !prev)}>
                    <div className="icon">
                      <i className="fa-brands fa-telegram"></i>
                    </div>
                    <p>Telegram</p>
                    <div className='current-details'>
                      <h3>
                        {myInfo?.telegram ? myInfo.telegram : "telegram qo'shing"}
                      </h3>
                    </div>
                  </div>
                  <div className='content' onClick={() => setIsShownInsta(prev => !prev)}>
                    <div className="icon">
                      <i className="fa-brands fa-square-instagram"></i>
                    </div>
                    <p>Instagram</p>
                    <div className='current-details'>
                      <h3>
                        {myInfo?.instagram ? myInfo.instagram : "instagram qo'shing"}
                      </h3>
                    </div>
                  </div>
                </div>
                {isShownNick && (
                <div className="change-details">
                  <div className="relative">
                    Ism o'zgartiring
                    <div className="input-fields">
                      <input type="text" placeholder='yangi ism' name='newNickname' onChange={(e) => setNewNickname(e.target.value)} />
                      <input type="submit" value="yuborish" onClick={submitName} />
                    </div>
                    <div className="exit" onClick={() => setIsShownnick(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="exit-svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
                )}
                {isShownBio && (
                  <div className="change-details">
                    <div className="relative">
                      Bio o'zgartiring
                      <div className="input-fields">
                        <input type="text" placeholder='yangi bio' name='newBio' onChange={(e) => setNewBio(e.target.value)} />
                        <input type="submit" value="yuborish" onClick={submitBio}  />
                      </div>
                      <div className="exit" onClick={() => setIsShownBio(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="exit-svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                {isShownTg && (
                  <div className="change-details">
                    <div className="relative">
                      Telegram user o'zgartiring
                      <div className="input-fields">
                        <input type="text" placeholder={`@ kerak emas!`} name='newTg' onChange={(e) => setNewTg(e.target.value)} />
                        <input type="submit" value="yuborish" onClick={submitTg} />
                      </div>
                      <div className="exit" onClick={() => setIsShownTg(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="exit-svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                {isShownInsta && (
                  <div className="change-details">
                    <div className="relative">
                      Insta user o'zgartiring
                      <div className="input-fields">
                        <input type="text" placeholder='insta nickname yozing' name='newInsta' onChange={(e) => setNewInsta(e.target.value)} />
                        <input type="submit" value="yuborish" onClick={submitInsta} />
                      </div>
                      <div className="exit" onClick={() => setIsShownInsta(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="exit-svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <footer>
        <div className="secondary_f">
          <div className="container">
            <div className="line">
              <div className="text">
                Ushbu sayt <a target='_blank' rel='noreferrer' href="https://instagram.com/_bakhramovvv__">_bakhramovvv__</a> tomonidan yaratilgan bo'lib, saytdagi barcha ma'lumotlar uning sinfi va sinfdoshlariga tegishlidir.Asosiy maqsad sinfdoshlar haqidagi barcha yangiliklarni bir birlariga yetqazib turishdir.Saytga faqat adminlar yangilik yubora oladilar.Biror yangilikga ega bo'lsangiz adminlarga bog'laning!
              </div>
              <div className="social-medias">
                <ul>
                  <a href="https://t.me/pinpointz"><li>
                    <i className="fa-brands fa-telegram"></i>
                  </li></a>
                  <a href="https://instagram.com/_bakhramovvv__"><li>
                    <i className="fa-brands fa-square-instagram"></i>
                  </li></a>
                  <a href="#"><li>
                    <i className="fa-brands fa-square-facebook"></i>
                  </li></a>
                  <a href="#"><li>
                    <i className="fa-brands fa-square-twitter"></i>
                  </li></a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}
