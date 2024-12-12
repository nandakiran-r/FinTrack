import React from 'react'

const Card = ({heading,sub,icon}) => {
  return (
    <div className="dashboard-content-card-content">
    <div>
        <h3 className="dashboard-content-card-content-heading">
            {heading}
        </h3>
        <h2 className="dashboard-content-card-content-info">
            {sub}
        </h2>
    </div>
    <div className="dashboard-content-card-content-icon">{icon}</div>
</div>
  )
}

export default Card