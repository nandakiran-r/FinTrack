
const TrackingDescriptionCard = ({detail}) => {
  return (
    <div className='tracking-description-card'>
        <h4 style={{color:detail.color,}}>{detail.status}</h4>
        <p >{detail.description}</p>
    </div>
  )
}

export default TrackingDescriptionCard