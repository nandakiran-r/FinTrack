import { useEffect, useState } from 'react'
import { DEStatistics } from '../../../helpers/api-communicator'
import Card from '../../common/Card'
import DashboardMid from '../../common/DashboardMid'
import Sidebar from '../../common/Sidebar'
import Topbar from '../../common/Topbar'
import RequestIcon from '../../../assets/svg/RequestIcon'
import TrackingDescription from '../../common/TrackingDescription'
import { DEChart } from './DEChart'

const statisticsData = {}

const DEDashboard = () => {
  const [statistics, setStatistics] = useState('')

  useEffect(() => {
    if (!statisticsData[0]) {
      DEStatistics()
        .then((data) => {
          setStatistics(data)
          statisticsData[0] = data
        })
        .catch((err) => {
          toast.error('Something Went Wrong', {
            toastId: 'something-went-wrong',
          })
        })
    } else {
      setStatistics(statisticsData[0])
    }
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-sub">
        <Sidebar />
        <div className="dashboard-main">
          <Topbar />
          <div className="dashboard-content">
            <div className="dashboard-content-card">
              <Card
                heading={'TOTAL'}
                sub={statistics?.requestCount ?? ''}
                icon={<RequestIcon />}
              />
            </div>
            <div className="content-container">
              <DashboardMid role="de" />
              <div className="dashboard-lower">
                <div className="dashboard-chart-container">
                  <DEChart statistics={statistics} />
                </div>
              <TrackingDescription/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DEDashboard
