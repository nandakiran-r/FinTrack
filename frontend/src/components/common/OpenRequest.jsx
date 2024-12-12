import React, { useEffect, useState } from 'react'
import html2PDF from 'html2pdf.js'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import RequestTable from './RequestTable'

const OpenRequest = ({ request, role }) => {
  const navigate = useNavigate()
  const [approved, setApproved] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [verified, setVerified] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const [comments, setComments] = useState('')

  const handlePDFDownload = async () => {
    toast.success('Downloading started ')
    const table = document.getElementById('open-container')

    table.style.padding = '10px'
    html2PDF(table, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/png',
      output: 'pdf/output.pdf',
    })
  }

  return (
    <div className="container-open">
      <div className="open-container">
        <div className="open-request-tbody" id="open-container">
          <h2 className="request-heading">
            Purchase Order details of {request.orderName}
          </h2>
          <div className="date-container">
            <p>Created On:{request.createdAt}</p>{' '}
          </div>
          {request.creqatedAt !== request.updateAt && (
            <div className="date-container">
              <p>Updated On:{request.date}</p>{' '}
            </div>
          )}

          {role === 'PH' && (
            <div className="itemNameField">
              <label htmlFor="name">Request From </label>
              <p id="name">: {request.fromuser}</p>
            </div>
          )}
          <div className="itemNameField">
            <label htmlFor="name">Order Name </label>
            <p id="name">: {request.orderName}</p>
          </div>
          {request.attachment && (
            <div className="attachmentField">
              <label htmlFor="attachment">Attachment </label>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  try {
                    window.open(
                      axios.defaults.baseURL + request.attachment,
                      '_blank',
                    )
                  } catch (e) {
                    toast.error('Invald Link')
                  }
                }}
                id="attachment"
                className="pointer"
              >
                : Click Here
              </div>
            </div>
          )}
          <RequestTable  order={request} role={role} />
        </div>
      </div>
    </div>
  )
}

export default OpenRequest