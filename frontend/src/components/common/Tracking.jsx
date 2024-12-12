import React, { useEffect, useState } from 'react'
import TrackingList from './TrackingList'

const Tracking = () => {
  const [tracking, setTracking] = useState()
  const token = localStorage.getItem('token')
  // useEffect(() => {
  //   const getTracking = async () => {
  //     let data
  //     if (token) {
  //       const { data: detokenData } = await DEget()
  //       data = detokenData
  //     }
  //     setTracking(data)
  //   }
  //   getTracking()
  // }, [])
  return (
    <div className="dashboard-mid-part2">
      <div className="dashboard-mid-part2-content">
        <h2 className="mid-part2-heading">
          Tracking
        </h2>
        {tracking && <TrackingList trackingData={tracking} />}
      </div>
    </div>
  )
}

export default Tracking
