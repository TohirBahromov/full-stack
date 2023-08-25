import React from 'react'
import "../../components/footer/footer.css"
import logo from "../../images/logo.png"

export default function Footer() {
  return (
    <>
      <div className="main_f">
        <div className="container">
          <div className="line">
            <div className="links">
              <ul>
                <a href="/"><li>Sayt haqida</li></a>
                <a href="/"><li>Reklama berish</li></a>
                <a href="/"><li>Dasturchi yollash</li></a>
                <a href="/"><li>Q&A</li></a>
              </ul>
            </div>
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
      </div>
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
    </>
  )
}
