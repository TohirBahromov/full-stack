import React from 'react'
import "../ads/ads.css"
import useFetch from "../../hooks/useFetch"

export default function Ads() {

  const {data} = useFetch("http://localhost:8800/api/advertisement")
  const randomAds = Math.floor(Math.random() * data?.length)

  return (
    <>
      <div className="adv__">
        <img src={`http://localhost:8800/${data?.[randomAds]?.img}`} alt="" />
      </div>
    </>
  )
}
