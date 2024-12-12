import React from 'react'
import TrackingDescriptionCard from './TrackingDescriptionCard'
import { TRACKING_DETAILS } from '../../assets/constants'

const TrackingDescription = () => {
  return (
    <div className='tracking-description'>
        {TRACKING_DETAILS?.map(detail=> <TrackingDescriptionCard key={detail.status} detail={detail}/>)}
    </div>
  )
}

export default TrackingDescription