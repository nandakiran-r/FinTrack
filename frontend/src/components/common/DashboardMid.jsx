import Tracking from './Tracking'

const DashboardMid = (props) => {
  const username = localStorage.getItem('username')

  return (
    <div className="dashboard-mid">
      <div className="dashboard-mid-part1">
        <div className="dashboard-mid-part1-content">
          <h3 className="dashboard-mid-part1-content-heading">
            Welcome {username.toUpperCase()}
          </h3>
          <div>
            <h2 className="dashboard-mid-part1-content-brand">
              FinTrack- Empowering Your Financial Growth.
            </h2>
            <p className="dashboard-mid-part1-content-text">
              Streamline your request and approval workflows with FinTrack.
              Enhance communication, tracking, and efficiency across departments
              for all your purchasing needs.
            </p>
          </div>
        </div>
        <div>
          <img
            className="dashboard-mid-part1-image"
            src="/graph.jpeg"
            alt=""
            srcSet=""
          />
        </div>
      </div>
      <Tracking />
    </div>
  )
}

export default DashboardMid
