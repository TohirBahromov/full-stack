import React, { useState } from 'react'
import "../news/news.css"
import Ads from "../../components/ads/ads"
import Navbar from "../../components/navbar/navbar"
import Footer from '../../components/footer/footer'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import useFetch from '../../hooks/useFetch'
import Loading from '../../utils/loading/loading'

export default function News() {

  const {data,loading:lentaload} = useFetch("https://classmatesweb.onrender.com/api/lenta")
  const {data:annsData,loading:annload} = useFetch("https://classmatesweb.onrender.com/api/announcement")
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

  const [lastElons, setLastElons] = useState(-5)
  const [lastLentasNum,setLastLentasNum] = useState(6)
  const { responsive } = useSelector(state => state.responsive)

  // const lentas = lentanews.map(l => {
  //   return l
  // })
  const lentanewsReverse = [...data]?.reverse()
  const lastLentas = lentanewsReverse?.slice(0, lastLentasNum)

  const news = lastLentas?.map(n => {
    return (
      <Link to={`/news/${n._id}`} key={n._id} className='ref_news'>
        <div className="news-block">
          <div className="img">
            <img src={n.img && `https://classmatesweb.onrender.com/${n.img}`} alt="" />
          </div>
          <div className="text-content_res">
            <div className="date"><p>{n.createdAt && changeDate(n.createdAt.toString())}</p></div>
            <div className="text">
              {n.title}
            </div>
            <div className="date res-date"><p>{n.createdAt && changeDate(n.createdAt.toString())}</p></div>
          </div>
        </div>
      </Link>
    )
  })

  function moreElons(){
    setLastElons(prev => {
      return prev - 5
    })
  }
  function more(){
    setLastLentasNum(prev => {
      return prev + 6
    })
  }
  function modalBody(){
    if(responsive){
      document.querySelector("body").style.overflow = "hidden"
    }else{
      document.querySelector("body").style.overflow = "initial"
    }
  }
  modalBody()

  const lastFiveElon = annsData?.slice(lastElons)
  const lastFiveElonReverse = lastFiveElon?.reverse()

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
      <div className={`wrapper-news ${responsive ? "wrapper-backdrop" : ""}`}>
          <>
            <header>
              <div className="container">
                <Ads />
                <Navbar />
              </div>
            </header>
            <main>
              <div className="container">
                <div className="wrapper_s row">
                  <div className="col-9 news-list">
                    {news}
                    <div className="more-adv elon-block" onClick={more}>
                      {data.length <= lastLentasNum ? "Oxiriga yetib keldingiz" : "Yana..."}
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
