import React, { useState } from 'react'
import "../register/register.css"
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [isShown,setIsShown] = useState(false)
  const navigate = useNavigate()
  const {responsive} = useSelector(state => state.responsive)

  const [formData, setFormData] = useState({
    username:"",
    surname:"",
    email:"",
    password:""
  })

  const hidePasswordIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hide-pass-icon" key={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
  const showPasswordIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="show-pass-icon" key={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>

  function changeType() {
    setIsShown(prev => {
      return !prev
    })
  }
  function handleChange(e){
    const {name, value} = e.target
    setFormData(prev => {
      return {
        ...prev,
        [name] : value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(formData.username === "" || formData.surname === "" || formData.email === "" || formData.password === ""){
      alert("Inputlardan biri kiritilmagan");
    }else{
      const res = await axios.post("https://classmatesweb.onrender.com/api/auth/register", {
        name:formData.username,
        email:formData.email,
        password:formData.password
      })
      alert(res.data)
      if(res.data === "success"){
        navigate("/");
        window.location.reload()
      }
    }
  }
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
    <div className="wrapper-register">
      <div className="container">
        <div className="register--header">
          <Link to="/">
            <div className="logo-line-register">
              <img src={logo} alt='' width="117" height="48" />
            </div>
          </Link>
          <div className="go-singIn">
            Akkauntingiz bormi? <Link to="/login">Kirish</Link>
          </div>
        </div>
      </div>
      <div className="wrapper">
          <main>
            <div className="form-line">
              <h1>Akkaunt yarating</h1>
              <div className="reg-form">
                <form className='form_reg'>
                  <div className="names">
                    <input type="text" placeholder='ismingiz' className={`me-1 ${formData.username ? '' : 'unacceptable'}`} name='username' onChange={handleChange} />
                    <input type="text" placeholder='familyangiz' className={`ms-1 ${formData.surname ? '' : 'unacceptable'}`} name='surname' onChange={handleChange} />
                  </div>
                  <div className="email">
                    <input type="email" placeholder='email' name='email' onChange={handleChange} className={`${formData.email ? '' : 'unacceptable'}`} />
                  </div>
                  <div className={`password ${formData.password ? '' : 'unacceptable'}`}>
                    <input type={`${isShown ? "text" : "password"}`} placeholder='parol' className='pass-input' name='password' onChange={handleChange} />
                    <div className="icon" onClick={changeType}>
                      {isShown ? [hidePasswordIcon] : [showPasswordIcon]}
                    </div>
                  </div>
                  <div className={`create`} onClick={handleSubmit}>
                    <button className={`${formData.username === "" || formData.surname === "" || formData.email === "" || formData.password === "" ? "locked" : ""}`}>Yaratish</button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      <footer>
      <div className="secondary_f">
        <div className="container">
          <div className="line">
            <div className="text">
              Ushbu sayt <a target='_blank' rel="noreferrer" href="https://instagram.com/_bakhramovvv__">_bakhramovvv__</a> tomonidan yaratilgan bo'lib, saytdagi barcha ma'lumotlar uning sinfi va sinfdoshlariga tegishlidir.Asosiy maqsad sinfdoshlar haqidagi barcha yangiliklarni bir birlariga yetqazib turishdir.Saytga faqat adminlar yangilik yubora oladilar.Biror yangilikga ega bo'lsangiz adminlarga bog'laning!
            </div>
            <div className="social-medias">
              <ul>
                <a href="/"><li>
                  <i className="fa-brands fa-telegram"></i>
                </li></a>
                <a href="/"><li>
                  <i className="fa-brands fa-square-instagram"></i>
                </li></a>
                <a href="/"><li>
                  <i className="fa-brands fa-square-facebook"></i>
                </li></a>
                <a href="/"><li>
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
