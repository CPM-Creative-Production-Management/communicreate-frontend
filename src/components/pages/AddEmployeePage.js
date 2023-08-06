import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import {Input, Button} from 'semantic-ui-react'
import { base_url } from '../..'
import { useApiRequest } from '../api/useApiRequest'
import { regularApiRequest } from '../api/regularApiRequest'
import { showToast } from '../../App'

const AddEmployeePage = () => {
    const firstNameRef = useRef('')
    const lastNameRef = useRef('')
    const [date, setDate] = useState('')
    const addressRef = useRef('')
    const ratingRef = useRef('')

    const addEmp = async () => {
        const firstName = firstNameRef.current.inputRef.current.value
        const lastName = lastNameRef.current.inputRef.current.value
        const address = addressRef.current.inputRef.current.value
        const rating = ratingRef.current.inputRef.current.value
        const dob = date
        
        const reqBody = {
            name: firstName + ' ' + lastName,
            address: address,
            rating: rating,
            dob: dob,
            salary: 1000
        }

        const response = await regularApiRequest({
            url: base_url + 'employee',
            method: 'POST',
            reqBody: reqBody
        })

        showToast('Employee added succesfully', 'success')
    }

    const dateChange = (event, data) => {
        const date = data.value
        const offset = date.getTimezoneOffset()
        const dateOffset = new Date(date.getTime() - (offset*60*1000))
        setDate(dateOffset.toISOString().split('T')[0])
    }

  return (
    <div>
        <br></br>
        <h1>Add Employee</h1>

        <Grid columns={2}>
            <Grid.Column>
            <Input required ref={firstNameRef} type='text' className='mt-4'
                           fluid
                           size='large' placeholder='First Name'/>
            </Grid.Column>
            <Grid.Column>
            <Input required ref={lastNameRef} type='text' className='mt-4'
                           fluid
                           size='large' placeholder='Last Name'/>
            </Grid.Column>
        </Grid>
        <Grid columns={1}>
            <Grid.Column>
            <Input required ref={addressRef} type='text' className='mt-4'
                            fluid
                            size='large' placeholder='Address'/>
            </Grid.Column>
        </Grid>
        <Grid columns={1}>
            <Grid.Column>
            <Input required ref={ratingRef} type='number' className='mt-4'
                            fluid
                            size='large' placeholder='Rating'/>
            </Grid.Column>
        </Grid>
        
        <br></br>
        <SemanticDatepicker label="Date of Birth:  " onChange={dateChange}></SemanticDatepicker>
        <br></br>
        <br></br>
        <Button onClick={addEmp}>Submit</Button>
    </div>
  )
}

export default AddEmployeePage