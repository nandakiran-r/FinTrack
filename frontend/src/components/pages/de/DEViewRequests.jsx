import React, { useState } from 'react'
import Sidebar from '../../common/Sidebar'
import Topbar from '../../common/Topbar'
import ViewRequests from './ViewRequests'
import ViewRequestRightbar from '../../common/ViewRequestRightbar'
const DEViewRequests = () => {
  const [searchCommon, setSearchCommon] = useState()
  const [searchSI, setSearchSI] = useState()
  const [searchName, setSearchName] = useState()
  const [searchCost, setSearchCost] = useState()
  return (
    <div className="dashboard">
      <div className="dashboard-sub">
        <Sidebar active="DEViewRequest" />
        <div className="dashboard-main">
          <Topbar />
          <div className="flex-full-row">
            <div className="request-container">
              <ViewRequests
                searchCommon={searchCommon}
                searchSI={searchSI}
                searchName={searchName}
                searchCost={searchCost}
              />
            </div>
            <ViewRequestRightbar
              setSearchCommon={setSearchCommon}
              setSearchSI={setSearchSI}
              setSearchName={setSearchName}
              setSearchCost={setSearchCost}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DEViewRequests
