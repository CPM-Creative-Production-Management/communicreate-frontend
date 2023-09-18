import React from 'react'
import { TableUnverifiedUserList } from '../../utils/TableUnverifiedUserList'
import { useNavigate } from 'react-router-dom'
import { Segment, Grid, Divider, Form, Button, Input, TextArea, Table } from "semantic-ui-react";
import { useApiRequest } from '../../api/useApiRequest'
import { base_url } from '../../..'
import { showToast } from "../../../App";

const AdminDashboard = () => {

  let navigate = useNavigate()

  const { data, dataLoading: requestsLoading, error } = useApiRequest({
    url: base_url + 'admin/dashboard',
    method: 'GET',
  })

  const { data: agencies, dataLoading: agenciesLoading, error: agenciesError } = useApiRequest({
    url: base_url + 'agency',
    method: 'GET',
  })

  const { data: companies, dataLoading: companiesLoading, error: companiesError } = useApiRequest({
    url: base_url + 'company',
    method: 'GET',
  })

  const deleteAgency = async (id) => {
    const response = await fetch(base_url + 'agency/' + id, {
      method: 'DELETE',
    })
  }

  const deleteCompany = async (id) => {
    const response = await fetch(base_url + 'company/' + id, {
      method: 'DELETE',
    })
  }

  const handleAgencySubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const reqBody = Object.fromEntries(formData)
    console.log('reqBody', reqBody)

    const response = await fetch(base_url + 'agency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()
    console.log('data', data)

    if (data.success) {
      showToast("New Agency Added!", { toastType: 'success' })
      window.location.reload()
    } else {
      showToast("Couldn't add Agency", { toastType: 'error' })
    }
  }

  const handleCompanySubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const reqBody = Object.fromEntries(formData)
    console.log('reqBody', reqBody)

    const response = await fetch(base_url + 'company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()
    console.log('data', data)

    if (data.success) {
      showToast("New Company Added!", { toastType: 'success' })
      window.location.reload()
    } else {
      showToast("Couldn't add Company", { toastType: 'error' })
    }
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <br />
      <hr />
      <br />
      {data && data.unverifiedUsers.length > 0 && <h2>Unverified Users</h2>}
      {data && data.unverifiedUsers.length > 0 && <TableUnverifiedUserList tableData={data.unverifiedUsers} />}
      <br />
      <hr />
      <br />
      <Segment>
        <Grid columns={2} relaxed='very'>
          <Grid.Column width={10}>
            <div>
              <h2>All Agencies</h2>
              <Table celled padded className='mt-3' style={{ textAlign: 'center' }}>

                <thead>
                  <tr>
                    <th scope={"col"}>#</th>
                    <th scope="col" >Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <Table.Body>
                  {agencies?.map((currItem, index) => (
                    <Table.Row key={currItem.id}>
                      <Table.Cell width={1}>
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell>{currItem.name}</Table.Cell>
                      <Table.Cell>{currItem.email}</Table.Cell>
                      <Table.Cell>{currItem.address}</Table.Cell>
                      <Table.Cell>{currItem.phone}</Table.Cell>
                      <Table.Cell>
                        <Button color='red' onClick={() => deleteAgency(currItem.id)}>Delete</Button>
                      </Table.Cell>

                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <h2>Add New Agency</h2>
            <Form onSubmit={handleAgencySubmit}>
              <Form.Field>
                <label>Name</label>
                <Form.Input name="name" placeholder="name" required={true} />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <TextArea
                  name="description" placeholder="write something about this agency..." />
              </Form.Field>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid id='email' label='Email' placeholder='example@gmail.com' required={true} />
                <Form.Input
                  fluid id='phone' label='Phone' placeholder='01xxxxxxxx' required={true} />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid id='address' label='Address' placeholder='Dhaka, Bangladesh' />
                <Form.Input
                  fluid id='website' label='Website URL' placeholder='www.example.com' />
              </Form.Group>
              <Button onSubmit primary>Add Agency</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
      <br />
      <br />
      <Segment>
        <Grid columns={2} relaxed='very'>
          <Grid.Column width={8}>
          <div>
              <h2>All Companies</h2>
              <Table celled padded className='mt-3' style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th scope={"col"}>#</th>
                    <th scope="col" >Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <Table.Body>
                  {companies?.map((currItem, index) => (
                    <Table.Row key={currItem.id}>
                      <Table.Cell width={1}>
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell>{currItem.name}</Table.Cell>
                      <Table.Cell>{currItem.email}</Table.Cell>
                      <Table.Cell>{currItem.address}</Table.Cell>
                      <Table.Cell>{currItem.phone}</Table.Cell>
                      <Table.Cell>
                        <Button color='red' onClick={() => deleteAgency(currItem.id)}>Delete</Button>
                      </Table.Cell>

                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <h2>Add New Company</h2>
            <Form onSubmit={handleAgencySubmit}>
              <Form.Field>
                <label>Name</label>
                <Form.Input name="name" placeholder="name" required={true} />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <TextArea
                  name="description" placeholder="write something about this company..." />
              </Form.Field>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid id='email' label='Email' placeholder='example@gmail.com' required={true} />
                <Form.Input
                  fluid id='phone' label='Phone' placeholder='01xxxxxxxx' required={true} />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid id='address' label='Address' placeholder='Dhaka, Bangladesh' />
                <Form.Input
                  fluid id='website' label='Website URL' placeholder='www.example.com' />
              </Form.Group>
              <Button onSubmit primary>Add Company</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  )
}

export { AdminDashboard }