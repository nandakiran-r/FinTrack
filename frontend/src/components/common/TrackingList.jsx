import React from 'react'
import TrackingCard from './TrackingCard'

const TrackingList = ({trackingData}) => {
  return (
    <div className='tracking-list'>
        { trackingData?.map(data=> <TrackingCard key={data._id} data ={data}/>) }
    </div>
  )
}

export default TrackingList