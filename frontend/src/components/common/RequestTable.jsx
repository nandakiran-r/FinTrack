import React from 'react'
import EditIcon from '../../assets/svg/EditIcon'
import Swal from 'sweetalert2'
import { DEEditRequest } from '../../helpers/api-communicator'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const RequestTable = ({ order, role }) => {
  const navigate = useNavigate()

  const handleEdit = (orderId,id, name, description, quantity, unit, cost, e) => {
    e.stopPropagation()
    Swal.fire({
      customClass: 'edit-user-sweet-alert',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: `Edit`,
      cancelButtonText: 'Cancel',
      title: `Edit Request`,
      html: `
      <input placeholder="Item Name" id="edit-request-name" type="text" class="swal2-input edit-user-sweet-alert-input" value='${name}' required><br>
      <input placeholder="Description" id="edit-request-description" type="text" class="swal2-input edit-user-sweet-alert-input" value='${description}' required><br>
      <input placeholder="Quantity" id="edit-request-quantity" type="number" class="swal2-input edit-user-sweet-alert-input" value='${quantity}' required><br>
      <select type="text" placeholder="Unit" id="edit-request-unit" class="swal2-input edit-user-sweet-alert-input edit-user-sweet-alert-select" required>
        <option ${unit === '' ? 'selected' : ''} value="">Select</options>
        <option ${
          unit === 'number' ? 'selected' : ''
        } value="number">Number</options>
        <option ${
          unit === 'kilogram' ? 'selected' : ''
        } value="kilogram">Kilogram</options>
        <option ${unit === 'box' ? 'selected' : ''} value="box">Box</options>
        <option ${unit === 'ctn' ? 'selected' : ''} value="ctn">Carton</options>
      </select><br>
      <input placeholder="Cost" id="edit-request-cost" type="text" class="swal2-input edit-user-sweet-alert-input" value=${cost} required><br> `,
      preConfirm: () => {
        let newName = document.getElementById('edit-request-name').value
        let newDescription = document.getElementById('edit-request-description')
          .value
        let newUnit = document.getElementById('edit-request-unit').value
        let newQuantity = document.getElementById('edit-request-quantity').value
        let newCost = document.getElementById('edit-request-cost').value
        if (
          !newName ||
          !newDescription ||
          !newUnit ||
          !newQuantity ||
          !newCost
        ) {
          toast.error('Content cannot be empty')
        } else {
          DEEditRequest(
            orderId,
            id,
            newName,
            newDescription,
            newQuantity,
            newUnit,
            newCost,
          )
            .then((data) => {
              if (data.status === 'success') {
                toast.success(data.message)
                navigate(-1)
              } else {
                toast.error(data.message)
              }
            })
            .catch((err) => {
              toast.error('Something Went Wrong')
            })
        }
      },
    })
  }

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
  return (
    <div className="table-container-open">
      <table className="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Total</th>
            {role === 'DE' && <th>Action</th>}
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {order &&
            order?.requests?.map((request) => {
              return (
                <tr key={request._id} >
                  <td>{request.name}</td>
                  <td>{request.description}</td>
                  <td>{request.unit}</td>
                  <td>{request.quantity}</td>
                  <td>{request.cost}</td>
                  <td>{request.total}</td>
                  {role === 'DE' && (
                    <td className="icon-container">
                      <EditIcon
                        onClick={(e) => {
                          handleEdit(
                            order.id,
                            request._id,
                            request.name,
                            request.description,
                            request.quantity,
                            request.unit,
                            request.cost,
                            e,
                          )
                        }}
                      />
                    </td>
                  )}
                  {request?.createdAt !== request?.updatedAt && (
                    <td>{dateConverter(request.updatedAt)}</td>
                  )}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default RequestTable
