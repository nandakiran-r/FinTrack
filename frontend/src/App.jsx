import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import {
  UserRoutes
} from './components/auth/PrivateRoutes'
import Login from './components/auth/Login.jsx'
import PageNotFound from './components/errors/PageNotFound.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DEDashboard from './components/pages/de/DEDashboard.jsx'
import axios from 'axios'
import DERequest from './components/pages/de/DERequest.jsx'
import DEViewRequests from './components/pages/de/DEViewRequests.jsx'
import Register from './components/auth/Register.jsx'

axios.defaults.baseURL = 'http://localhost:5000'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/register" Component={Register}></Route>
        <Route element={<UserRoutes />}>
          <Route path="/dashboard/" Component={DEDashboard}></Route>
          <Route path="/dashboard/new-expense" Component={DERequest}></Route>
          <Route path="/dashboard/view-request" Component={DEViewRequests}></Route>
        </Route>
        <Route path="*" Component={PageNotFound} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        draggable={false}
        theme="dark"
      />
    </Router>
  )
}

export default App
