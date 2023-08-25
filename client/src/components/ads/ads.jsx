import React from 'react'
import "../ads/ads.css"
import useFetch from "../../hooks/useFetch"

export default function Ads() {

  const {data} = useFetch("https://classmatesweb.onrender.com/api/advertisement")
  const randomAds = Math.floor(Math.random() * data?.length)

  return (
    <>
      <div className="adv__">
        <img src={`https://classmatesweb.onrender.com/${data?.[randomAds]?.img}`} alt="" />
      </div>
    </>
  )
}
