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
import { useNavigate } from 'react-router-dom'
import s3 from '../../config/s3'

const AddEmployeePage = () => {
    const firstNameRef = useRef('')
    const lastNameRef = useRef('')
    const [date, setDate] = useState('')
    const addressRef = useRef('')
    const ratingRef = useRef('')
    const salaryRef = useRef('')
    const imageRef = useRef('')

    let navigate = useNavigate()

    const handleFile = (e) => {
        const file = e.target.files[0]
        
    }

    const addEmp = async () => {
        const firstName = firstNameRef.current.inputRef.current.value
        const lastName = lastNameRef.current.inputRef.current.value
        const address = addressRef.current.inputRef.current.value
        const rating = ratingRef.current.inputRef.current.value
        const salary = salaryRef.current.inputRef.current.value
        const dob = date
        
        const reqBody = {
            name: firstName + ' ' + lastName,
            address: address,
            rating: rating,
            dob: dob,
            salary: salary
        }

        const response = await regularApiRequest({
            url: base_url + 'employee',
            method: 'POST',
            reqBody: reqBody
        })

        const file = imageRef.current.inputRef.current.files[0]

        try {
            const params = {
                Bucket: 'cpm-backend',
                Key: 'profile_pictures/employees/' + response.data.id + '.jpg',
                Body: file
            }
    
            s3.putObject(params, function(err, data) {
                if (err) console.log(err); // an error occurred
            });
        } catch (err) {
            console.log(err)
        }

        if (response.status === 200) {
        showToast('Employee added succesfully', 'success')
        navigate('/my-employees')
        } else {
        showToast('Error adding employee', 'error')
        }
    }

    const dateChange = (event, data) => {
        const date = data.value
        const offset = date.getTimezoneOffset()
        const dateOffset = new Date(date.getTime() - (offset*60*1000))
        setDate(dateOffset.toISOString().split('T')[0])
    }

    const fileUpload = async () => {

        // const params = {
        //     Bucket: 'cpm-backend',
        //     Key: 'test.txt',
        //     Body: 'Hello!'
        // }
        // s3.putObject(params, function(err, data) {
        //     if (err) console.log(err); // an error occurred
        //     else     console.log(data);           // successful response
        //   });

        console.log(imageRef.current.inputRef.current.files[0])
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
            <Input required ref={addressRef} type='text' className='mt-0'
                            fluid
                            size='large' placeholder='Address'/>
            </Grid.Column>
        </Grid>
        <Grid columns={2}>
            <Grid.Column>
            <Input required ref={ratingRef} type='number' className='mt-0'
                            fluid
                            size='large' placeholder='Rating'/>
            </Grid.Column>
            <Grid.Column>
            <Input required ref={salaryRef} type='number' className='mt-0'
                            fluid
                            size='large' placeholder='Salary'/>
            </Grid.Column>
        </Grid>

        <Grid>
            <Grid.Column>
                <Input type="file" onChange={handleFile} ref={imageRef} />
            </Grid.Column>
        </Grid>
        
        <br></br>
        Date of Birth <br/>
        <SemanticDatepicker className={'mt-2'}  onChange={dateChange}></SemanticDatepicker>
        <br></br>
        <br></br>
        <Button primary onClick={addEmp}>Add Employee</Button>
    </div>
  )
}

export default AddEmployeePage