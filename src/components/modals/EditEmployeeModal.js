import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import { Input } from 'semantic-ui-react'
import {Button} from 'semantic-ui-react'
import { regularApiRequest } from '../api/regularApiRequest'
import { base_url } from '../..'
import { globalLoading, showToast } from '../../App'

const EditEmployeeModal = (props) => {

    const nameRef = useRef('')
    const addressRef = useRef('')
    const salaryRef = useRef('')

    let navigate = useNavigate()

    const handleSave = async () => {

        const name = nameRef.current.inputRef.current.value
        const address = addressRef.current.inputRef.current.value
        const salary = salaryRef.current.inputRef.current.value

        // if salary is not a number
        if (isNaN(salary)) {
            showToast('Salary must be a number', 'error')
            return
        }

        const reqBody = {
            name: nameRef.current.inputRef.current.value,
            address: addressRef.current.inputRef.current.value,
            salary: salaryRef.current.inputRef.current.value
        }

        const response = await regularApiRequest({
            url: base_url + 'employee/' + props.editData.id,
            method: 'PUT',
            reqBody: reqBody
        })
        
        if(!globalLoading) {
          if (response.status === 200) {
              showToast('Employee updated successfully', 'success')
          } else {
              showToast('Error updating employee', 'error')
          }
        }

        props.setShow(false)

        window.location.reload()
    }

    const handleDelete = () => {
        const id = props.editData.id
        const deleteEmployee = async () => {
            const response = await regularApiRequest({
                url: base_url + 'employee/' + id,
                method: 'DELETE'
            })
            if (response.status === 200) {
                showToast('Employee deleted successfully', 'success')
            } else {
                showToast('Error deleting employee', 'error')
            }
            props.setShow(false)
            window.location.reload()
        }
        deleteEmployee()
    }

  return (
    <Modal {...props} size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
        <Modal.Header >
          <Modal.Title>{props.editData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Input type="text" label='Name' placeholder='Name' defaultValue={props.editData.name} ref={nameRef} />
            <Input label='Salary' type='number' placeholder='Salary' defaultValue={props.editData.salary} ref={salaryRef} />
            <Input type="text" label='Address' placeholder='Address' defaultValue={props.editData.address} ref={addressRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            props.setShow(false)}}>
            Close
          </Button>
          <Button primary onClick={handleSave}>
            Save Changes
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default EditEmployeeModal