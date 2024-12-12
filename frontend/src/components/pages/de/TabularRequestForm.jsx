import React, { useEffect, useState } from 'react'
import {
  DEAddReport
} from '../../../helpers/api-communicator'
import { toast } from 'react-toastify'

const TabularRequestForm = () => {
  const [tableData, setTableData] = useState([
    {
      name: '',
      description: '',
      type: '',
      cost: '',
    },
  ])
  const [grandTotal, setGrandTotal] = useState(0)
  const [reportName, setReportName] = useState(null)

  const handleInputChange = (index, e) => {
    const { name, value } = e.target
    const newData = [...tableData]
    newData[index][name] = value

    setTableData(newData)
  }

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        name: '',
        description: '',
        type: '',
        cost: '',
      },
    ])
  }

  const handleRemoveRow = (index) => {
    const newData = [...tableData]
    newData.splice(index, 1)
    setTableData(newData)
  }

  const calculateGrandTotal = () => {
    let total = 0
    tableData.forEach((row) => {
      const cost = parseFloat(row.cost)
      total += cost
    })
    setGrandTotal(total)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValid = tableData.every((item) => {
      return (
        item.name &&
        item.description &&
        item.type &&
        item.cost &&
        !isNaN(parseFloat(item.cost))
      )
    })

    if (!isValid) {
      toast.error('All fields required and must be in correct format!', {
        toastId: 'error',
      })
      return
    }

    const dataPayload = {
      tableData: tableData.map((row) => ({
        name: row.name,
        description: row.description,
        type: row.type,
        cost: row.cost,
      })),
      grandTotal: grandTotal,
      reportName: reportName,
    }

    try {
      const data = await DEAddReport(dataPayload)
      console.log(data);
      
      if (data.status === 'ok') {
        setTableData([
          {
            name: '',
            description: '',
            type: '',
            cost: '',
          },
        ])
        setReportName(null)
        setGrandTotal(0)
        toast.success(data.message)
      }
      else {
        toast.error('Failed to submit data. Please fill everything correctly.', {
          toastId: 'error',
        })
      }
    } catch (error) {
      toast.error('Failed to submit data. Please try again later.', {
        toastId: 'error',
      })
    }
  }

  useEffect(() => {
    calculateGrandTotal()
  }, [tableData])

  return (
    <div className="order-container">
      <h1 className="heading-center">New Report</h1>
      <div className="create-order-total">
        <label className="create-user-label" htmlFor="reportName">
          Report Name:{' '}
        </label>
        <input
          onChange={(e) => setReportName(e.target.value)}
          className="create-user-input"
          type="text"
          value={reportName ? reportName : ''}
          required
        />
      </div>

      <table id="requestTable" className="table">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Description</th>
            <th>Expense Type</th>
            <th>Expense Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, index) => {
            return (
              <tr key={index} className="pointer">
                <td>
                  <input
                    onChange={(e) => handleInputChange(index, e)}
                    name="name"
                    className="create-user-input"
                    type="text"
                    value={row?.name ? row.name : ''}
                    required
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange(index, e)}
                    name="description"
                    className="create-user-input"
                    type="text"
                    value={row?.description ? row.description : ''}
                    required
                  />
                </td>
                <td>
                  <select
                    onChange={(e) => handleInputChange(index, e)}
                    name="type"
                    className="create-user-input"
                    type="text"
                    value={row?.type ? row.type : ''}
                    required
                  >
                    <option value="">Select</option>
                    <option value="rent">Rent</option>
                    <option value="food">Food</option>
                    <option value="loan">Loan</option>
                    <option value="investment">Investment</option>
                    <option value="miscellaneous">Miscellaneous</option>
                  </select>
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange(index, e)}
                    name="cost"
                    className="create-user-input"
                    type="text"
                    value={row?.cost ? row.cost : ''}
                    required
                  />
                </td>
                <td>
                  <button
                    className="remove-button pointer"
                    onClick={() => handleRemoveRow(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="create-order-total">
        <button className="addRow-button pointer" onClick={handleAddRow}>
          Add Row
        </button>
        <h2>Grand Total:${grandTotal}</h2>
      </div>
      <div className="div-submitButton">
        <button className="submitButton pointer" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default TabularRequestForm
