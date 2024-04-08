import React from 'react'
import "../ads/ads.css"
import useFetch from "../../hooks/useFetch"

export default function Ads() {

  const {data} = useFetch("/api/advertisement")
  const randomAds = Math.floor(Math.random() * data?.length)

  return (
    <>
      <div className="adv__">
        <img src={`https://class11a.onrender.com//${data?.[randomAds]?.img}`} alt="" />
      </div>
    </>
  )
}
