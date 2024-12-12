import React from 'react'
import Sidebar from '../../common/Sidebar'
import Topbar from '../../common/Topbar'
import TabularRequestForm from './TabularRequestForm'

const DERequest = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-sub">
        <Sidebar active="DERequest" />
        <div className="dashboard-main">
          <Topbar />
          <div className="request-container">
            <TabularRequestForm/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DERequest
