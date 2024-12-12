import { toast } from 'react-toastify'
import HomeIcon from '../../assets/svg/HomeIcon'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '../../assets/svg/LogoutIcon'
import PlusIcon from '../../assets/svg/PlusIcon'
import TransactionIcon from '../../assets/svg/TransactionIcon'

const Sidebar = (props) => {
  const navigate = useNavigate()

  function Logout() {
    localStorage.clear()
    window.location.reload()
    toast.success('Logout Successful')
  }

  const active = props.active

  function SidebarContents() {
    let returnComponent = (
      <>
        <div
          className={`pointer dashboard-sidebar-content-sub ${active === 'DERequest'
              ? 'dashboard-sidebar-content-sub-active'
              : ''
            } ${'justify-left'}`}
          onClick={() => {
            navigate('/dashboard/new-expense')
          }}
        >
          <div className="dashboard-sidebar-content-sub-icon">
            <PlusIcon />
          </div>
          New Expense
        </div>
        <div
          className={`pointer dashboard-sidebar-content-sub ${active === 'DEViewRequest'
              ? 'dashboard-sidebar-content-sub-active'
              : ''
            } ${'justify-left'}`}
          onClick={() => {
            navigate('/dashboard/view-request')
          }}
        >
          <div className="dashboard-sidebar-content-sub-icon">
            <TransactionIcon />
          </div>
          View Requests
        </div>
      </>
    )
    return returnComponent
  }


  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-logo">
        <span className="brand">FinTrack</span>
      </div>
      <hr className="nav-hr" />
      <div className="dashboard-sidebar-content">
        <div
          className={`pointer dashboard-sidebar-content-sub ${!active ? 'dashboard-sidebar-content-sub-active' : ''
            } ${'justify-left'}`}
          onClick={() => {
            navigate('/dashboard/')
          }}
        >
          <div className="dashboard-sidebar-content-sub-icon">
            <HomeIcon />
          </div>
          Dashboard
        </div>
        <SidebarContents />
      </div>
      <div className="dashboard-sidebar-account-pages">Account Pages</div>
      <div className="dashboard-sidebar-content">
        <div
          className={`pointer dashboard-sidebar-content-sub ${'justify-left'
            }`}
          onClick={Logout}
        >
          <div className="dashboard-sidebar-content-sub-icon">
            <LogoutIcon />
          </div>
          Logout
        </div>
      </div>
      <div className="dashboard-sidebar-bottom-content">
        <div className="dashboard-sidebar-bottom-box">
          FinTrack
          <div className="dashboard-sidebar-bottom-box-small-text">
            Empowering Your Financial Growth.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
