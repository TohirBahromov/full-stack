import { React, useState, useRef,useEffect } from 'react';
import "../mainpage/mainpage.css";
import "../mainpage/mainpageRes.css";
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import Ads from '../../components/ads/ads';
import Comment from '../../components/comment/comment';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectClassmate, unselectClassmate } from '../../redux/classmatesSlice';
import useFetch from '../../hooks/useFetch';
import classmates from '../../sources/classmates';

export default function Mainpage() {

  const {data:annsData} = useFetch("/api/announcement")
  const {data:lentaData} = useFetch("/api/lenta")
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

  const widthElement = useRef(null)
  const widthParent = useRef(null)
  const [lastNumClassmate,setLastNumClassmate] = useState(5)
  const [windowDimension, setWindowDimension] = useState({
    windowWidth : window.innerWidth,
    windowHeight : window.innerHeight
  })
  const detectSize = () => {
    setWindowDimension({
      windowWidth : window.innerWidth,
      windowHeight : window.innerHeight
    })
  }
  useEffect(()=>{
    window.addEventListener("resize", detectSize)
    return ()=>{
      window.removeEventListener("resize", detectSize)
    }
  },[windowDimension])
  
  const dispatch = useDispatch()
  const {responsive} = useSelector(state => state.responsive)
  const {isShown:commentedModalIsShown} = useSelector(state => state.commentUser)

  const lastClassmates = classmates.slice(0,lastNumClassmate)
  const lastFiveLenta = lentaData?.slice(-5)
  const lastFiveLentaReverse = lastFiveLenta?.reverse()
  const lastSevenAdvs = annsData?.slice(-7)
  const lastSevenAdvsReverse = lastSevenAdvs?.reverse()
  const omitFirstAdv = lastSevenAdvsReverse?.filter((item, index) => {
    return index >= 1;
  })
  // Testing
  const [widthBox, setWidthBox] = useState(0)
  useEffect(()=>{
    setWidthBox(widthElement.current?.clientWidth)
  },[])
  const [slide, setSlide] = useState(0)
  const {isShown,...selectedClassmate} = useSelector(state => state.classmate)

  const widthCard = widthBox + 19
  const widthCarouselFloat = widthCard * (lastClassmates.length + 1)
  function detectNumberCards(){
    if(windowDimension.windowWidth > 1200){
      return 5
    }else if(windowDimension.windowWidth > 990){
      return 4
    }else if(windowDimension.windowWidth > 765){
      return 3
    }else{
      return 2
    }
  }
  const lastPointCarousel = widthCarouselFloat - (widthCard * detectNumberCards())
  const transformation = {
    transform: `translate3d(${slide}px, 0px, 0px)`
  }
  const unmovingCarousel = {
    backgroundColor : "#b8b7b7"
  }
  const movingCarousel = {
    backgroundColor : "#fff"
  }


  function slideRight(){
    if(slide === -lastPointCarousel){
      return
    }else{
      setSlide(prevSlide => prevSlide - widthCard)
    }
  }
  function slideLeft(){
    if(slide === 0){
      return
    }else{
      setSlide(prevSlide => prevSlide + widthCard)
    }
  }
  function selectUser(name,img,surname,birthday,height,status,stuwor,tel){
    dispatch(selectClassmate({name,img,surname,birthday,height,status,stuwor,tel}))
    document.querySelector("body").style.overflow = "hidden"
  }
  function unselectUser(){
    dispatch(unselectClassmate())
    document.querySelector("body").style.overflow = "initial"
  }
  function nextClassmates(){
    setLastNumClassmate(prev => prev + 5)
  }

  const SquareCard = lastClassmates.map((f)=>{
    return(
      <div className='square-card' key={f.id} ref={widthElement} onClick={()=> selectUser(f.name,f.img,f.surname,f.birthday,f.height,f.status,f.stuwor,f.tel)}>
        <div className="img-content_square">
          <img src={f.img} alt="" />
        </div>
        <div className="price-content_square">
          <h1 className='cost_square'>{f.name}</h1>
          <h1 className='surname_f'>{f.surname}</h1>
          <div className="social-medias">
            {f.tg && (
              <a target='_blank' rel='noreferrer' href={f.tg && `https://t.me/${f.tg}`} className='tg'>
                <i className="fa-brands fa-telegram"></i>
              </a>
            )}
            {f.insta && (
              <a target='_blank' rel='noreferrer' href={f.insta && `https://instagram.com/${f.insta}`} className='insta'>
                <i className="fa-brands fa-square-instagram"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    )
  })

  

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
      <div className={`wrapper ${(isShown && "wrapper-blur") || (responsive && "wrapper-blur") || (commentedModalIsShown && "wrapper-blur")}`}>
          <>
            <header>
              <div className="container">
                <Ads />
                <Navbar />
              </div>
            </header>
            <main>
              <div className="container">
                <div className="row all_massive-news">
                  <div className="col-9 announcements-main_b">
                    <Link key={lastSevenAdvsReverse[0]?._id} to={`/announcements/${lastSevenAdvsReverse[0]?._id}`}>
                      <div className="row main_first">
                        <div className="col main-news_img g-0">
                          <img src={lastSevenAdvsReverse[0]?.img && `https://class11a.up.railway.app/${lastSevenAdvsReverse[0]?.img}`} alt="" />
                        </div>
                        <div className="col main-news_content g-0 p-3">
                          <span className='date'><p>{lastSevenAdvsReverse[0]?.createdAt && changeDate(lastSevenAdvsReverse[0]?.createdAt.toString())}</p></span>
                          <h1>{lastSevenAdvsReverse[0]?.title}</h1>
                          <p>{lastSevenAdvsReverse[0]?.text}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="row row-cols-2 main-news_blocks w-100 mt-3">
                      {omitFirstAdv?.map(news => {
                        return(
                          <Link key={news._id} to={`/announcements/${news._id}`}>
                            <div className="col mb-3 g-0 d-flex">
                              <div className="img-content">
                                <img src={news.img && `https://class11a.up.railway.app/${news.img}`} alt="" />
                              </div>
                              <div className="text-content p-3">
                                <span className="date"><p>{changeDate(news.createdAt.toString())}</p></span>
                                <div className='txt'>{news.title}</div>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                  <div className="col-3 lentanews-main_b">
                    <div className="head_sp">
                      <h1 className="header_web">So'ngi yangiliklar</h1>
                    </div>
                    {lastFiveLentaReverse?.map(l => {
                      return(
                        <Link key={l._id} to={`/news/${l._id}`}>
                          <div className="lenta">
                            <div className="date">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="calendar-svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                              </svg>
                              <p>{l.createdAt && changeDate(l.createdAt.toString())}</p>
                            </div>
                            <div className="content_">
                              <div className="img">
                                <img src={l.img && `https://class11a.up.railway.app//${l.img}`} alt="" />
                              </div>
                              <div className='txt'>{l.title}</div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                    <Link to="/news" className='link-router_lenta'>
                      <div className="all-news">
                        <h1>Barcha yangiliklar</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="chev-right">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
                <div id="square--elements__carousel" ref={widthParent}>
                    <div className="square--elements__floating" style={transformation}>
                      {SquareCard}
                      <div className="square-card more-students" onClick={nextClassmates}>
                        <i className="fa-solid fa-graduation-cap me-1"></i>
                        <h3>{classmates.length > lastNumClassmate ? "yana..." : "tugadi..."}</h3>
                      </div>
                    </div>
                    <div className="buttons">
                      <div className="dehover-btn" onClick={slideLeft} style={slide === 0 ? unmovingCarousel : movingCarousel}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="carousel-left">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </div>
                      <div className="dehover-btn" onClick={slideRight} style={slide === -lastPointCarousel ? unmovingCarousel : movingCarousel}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="carousel-right">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                </div>
                {isShown && (
                  <div className="selected-classmate">
                    <div className="svg" onClick={unselectUser}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="exit-svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div className="classmate--info">
                      <div className="img-selectedC">
                        <img src={selectedClassmate.img} alt="" />
                      </div>
                      <div className="details_c">
                        <div>
                          <span>Ism</span>
                          <span>{selectedClassmate?.name}</span>
                        </div>
                        <div>
                          <span>Familya</span>
                          <span>{selectedClassmate?.surname}</span>
                        </div>
                        <div>
                          <span>Tug'ilgan sana</span>
                          <span>{selectedClassmate?.birthday || "yashirilgan"}</span>
                        </div>
                        <div>
                          <span>Bo'yi</span>
                          <span>{selectedClassmate?.height}</span>
                        </div>
                        <div>
                          <span>Status</span>
                          <span>{selectedClassmate?.status || "yashirilgan"}</span>
                        </div>
                        <div>
                          <span>O'qiydi / Ishlaydi</span>
                          <span>{selectedClassmate?.stuwor}</span>
                        </div>
                        <div>
                          <span>Telefon</span>
                          <span>{selectedClassmate.tel === "" ? "yashirilgan" : selectedClassmate.tel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <Comment />
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
