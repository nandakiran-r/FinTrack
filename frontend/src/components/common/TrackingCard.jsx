import React from 'react'

const TrackingCard = ({ data }) => {
  return (
    <div className="tracking-card">
      {data?.tracking ? (
        <div className="tracking-card-content">
          <h4>{data?.orderName}</h4>

          {(data?.tracking === 'phverified' && (
            <h4 style={{ color: 'orange' }}>VERIFIED </h4>
          )) ||
            (data?.tracking === 'peassigned' && (
              <h4 style={{ color: 'purple' }}>ASSIGNED </h4>
            )) ||
            (data?.tracking === 'definished' && (
              <h4 style={{ color: 'darkgreen' }}>COMPLETED</h4>
            )) ||
            (data?.tracking === 'dmapproved' && (
              <h4 style={{ color: 'brown' }}>APPROVED</h4>
            )) ||
            (data?.tracking !== 'dmapproved' &&
              'definished' &&
              'peassigned' &&
              'phverified' && <h4 style={{ color: 'darkblue' }}>CREATED</h4>)}
        </div>
      ) : (
        <h4>{data?.categoryName}</h4>
      )}
    </div>
  )
}

export default TrackingCard
