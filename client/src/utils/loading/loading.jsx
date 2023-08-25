import React from 'react'
import "./loading.css"

export default function Loading() {
  return (
    <>
      <div className="loading-wrapper">
        <div className="loading-float">
          <div className="spans">
            <div className="st"></div>
            <div className="nd"></div>
            <div className="rd"></div>
          </div>
          <div className="loading">Loading</div>
        </div>
      </div>
    </>
  )
}
