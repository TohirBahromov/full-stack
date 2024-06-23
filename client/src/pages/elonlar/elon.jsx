import React, { useState } from 'react'
import "../elonlar/elon.css"
import Navbar from '../../components/navbar/navbar'
import Ads from '../../components/ads/ads'
import Footer from "../../components/footer/footer"
import { Link, useLocation } from 'react-router-dom'
import {useSelector} from "react-redux"
import useFetch from '../../hooks/useFetch'

export default function Elon() {

  const {data} = useFetch("/api/announcement")
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
  const [lastElonNews, setLastElonNews] = useState(-3)
  const { responsive } = useSelector(state => state.responsive)

  let location = useLocation()
  const currentAnnId = location.pathname.split("/")[2]

  const currentElon = data?.find(d => d._id === currentAnnId)
  const lastElons = data?.filter(i => {
    return i._id !== currentAnnId
  })

  function moreElons(){
    setLastElonNews(prev => {
      return prev - 3
    })
  }

  const lastFiveElon = lastElons?.slice(lastElonNews)
  const lastFiveElonReverse = lastFiveElon?.reverse()
  function modalBody(){
    if(responsive){
      document.querySelector("body").style.overflow = "hidden"
    }else{
      document.querySelector("body").style.overflow = "initial"
    }
  }
  modalBody()

  const elon = lastFiveElonReverse?.map(e => {
    return (
      <Link key={e._id} to={`/announcements/${e._id}`}>
        <div className="elon-block">
          <div className="date">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="calendar-svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
            <p>{e.createdAt && changeDate(e.createdAt.toString())}</p>
          </div>
          <div className="content_elon">
            <p>{e.title}</p>
          </div>
        </div>
      </Link>
    )
  })

  return (
    <>
    <div className={`wrapper-announcems ${responsive ? "wrapper-backdrop" : ""}`}>
        <>
          <header>
            <div className="container">
              <Ads />
              <Navbar />
            </div>
          </header>
          <main>
            <div className="container">
              <div className="row mass_block">  
                <div className="col-9 news-list" key={currentElon?._id}>
                  <div className="intro_adv">
                    <div className="date">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="calendar-svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                      </svg>
                      <p>{currentElon?.createdAt && changeDate(currentElon?.createdAt.toString())}</p>
                    </div>
                    <div className="header--adv">
                      <h1>{currentElon?.title}</h1>
                    </div>
                  </div>
                  <div className="content_adv">
                    <div className="img">
                      <img src={currentElon && `https://class11a.onrender.com/${currentElon?.img}`} alt="" />
                    </div>
                    <p>{currentElon?.text}</p>
                  </div>
                </div>
                <div className="col-3 additional_n">
                  <div className="head_sp">
                    <h1 className="header_web">E'lonlar</h1>
                  </div>
                  {elon}
                  <div className="more-adv elon-block" onClick={moreElons}>
                    Ko'proq e'lonlar...
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer>
            <Footer />
          </footer>
        </>
    </div>
    </>
  )
}
