import React, { useEffect, useState } from 'react'
import {
  DEFinishRequest,
  DEViewRequests,
} from '../../../helpers/api-communicator'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import TrashIcon from '../../../assets/svg/TrashIcon'

const ViewRequests = ({
  searchCommon,
  searchSI,
  searchName,
  searchCost,
  searchUnit,
  searchMinDate,
  searchMaxDate,
  sortBySI,
  sortByCompleted,
}) => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.has('refresh')) {
      navigate('/dashboard/view-request')
    }
  }, [searchParams])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DEViewRequests()
        setRequests(data)
        setFilteredRequests(data)
      } catch (err) {
        toast.error('Something Went Wrong')
      }
    }

    fetchData()
  }, [searchParams])

  const dateConverter = (date) => {
    const dt = new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    return dt
  }

  const handleFinishRequest = async (id) => {
    if (window.confirm('Are you want to remove this report?')) {
      const data = await DEFinishRequest(id)
      if (data.status === 'success') {
        toast.success('Request Removed Successfully')
        navigate('/dashboard/view-request?refresh=true')
      }
    }
  }

  useEffect(() => {
    const filterRequests = () => {
      if (
        (searchCommon && searchCommon !== null) ||
        (searchSI && searchSI !== null) ||
        (searchName && searchName !== null) ||
        (searchCost && searchCost !== null)
      ) {
        const filtered = requests.filter((res) => {
          return (
            (!searchCommon ||
              res.reportName
                .toLowerCase()
                .includes(searchCommon.toLowerCase()) ||
              res.grandTotal.toString().includes(searchCommon.toString())) &&
            (!searchSI || String(res.si).includes(String(searchSI))) &&
            (!searchName ||
              res.reportName.toLowerCase().includes(searchName.toLowerCase())) &&
            (!searchCost ||
              String(res.grandTotal).includes(String(searchCost)))
          )
        })

        if (JSON.stringify(filtered) !== JSON.stringify(filteredRequests)) {
          setFilteredRequests(filtered)
        }
      } else {
        setFilteredRequests(requests)
      }
    }

    filterRequests()
  }, [
    searchCommon,
    searchSI,
    searchName,
    searchCost,
    searchUnit,
    searchMinDate,
    searchMaxDate,
    requests,
  ])

  useEffect(() => {
    const sortRequests = () => {
      if (sortBySI || sortByCompleted) {
        const sorted = [...requests].sort((a, b) => {
          return (
            (sortBySI && a.si - b.si) ||
            (sortByCompleted && a.tracking === 'definished'
              ? -1
              : b.tracking === 'definished'
              ? 1
              : 0)
          )
        })
        setFilteredRequests(sorted)
      } else {
        setFilteredRequests(requests)
      }
    }

    sortRequests()
  }, [requests, sortBySI, sortByCompleted])

  return (
    <div className="table-container">
      <table id="requestTable" className="table">
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Order Name</th>
            <th>Created</th>
            <th>Total Cost</th>
            <th>Actions</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {filteredRequests &&
            filteredRequests?.length > 0 &&
            filteredRequests?.map((request) => (
              <tr
                key={request._id}
                className="pointer"
              >
                <td>{request.si}</td>
                <td>{request.reportName}</td>
                <td>{request.fromUser}</td>
                <td>{request.grandTotal} $ AMOUNT </td>
                <td className="icon-container">
                  <TrashIcon
                    onClick={(e) => {
                      handleFinishRequest(
                        request._id
                      )
                    }}
                  />
                  
                </td>
                <td className="date">{dateConverter(request.createdAt)}</td>
              </tr>
            ))}
          <></>
        </tbody>
      </table>
    </div>
  )
}

export default ViewRequests
