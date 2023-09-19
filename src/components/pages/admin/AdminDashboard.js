import React from 'react'
import { TableUnverifiedUserList } from '../../utils/TableUnverifiedUserList'
import { useState, useEffect, useRef } from 'react'
import { Segment, Grid, Divider, Form, Button, Input, TextArea, Table, Menu, Dropdown } from "semantic-ui-react";
import { useApiRequest } from '../../api/useApiRequest'
import { regularApiRequest } from "../../api/regularApiRequest";
import { base_url } from '../../..'
import { showToast } from "../../../App";

const AdminDashboard = () => {

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

  const { data: tagsData, dataLoading: tagsLoading, error: tagsError } = useApiRequest({
    url: base_url + 'tag',
    method: 'GET',
  })

  const addNewTag = async (event) => {
    event.preventDefault()
    const reqBody = {
      tag: event.target.tagName.value
    }

    const response = await regularApiRequest({
      url: base_url + 'tag',
      method: 'POST',
      reqBody: reqBody,
    })

    if (response.status === 200) {
      event.target.reset();
      showToast("New Tag Added!", { toastType: 'success' })
      window.location.reload()
    } else {
      showToast("Couldn't add Tag", { toastType: 'error' })
    }
  }

  const deleteAgency = async (id) => {
    try {
      const response = await regularApiRequest({
        url: base_url + 'agency/' + id,
        method: 'DELETE',
      });

      if (response.status === 200) {
        showToast("Agency deleted!", { toastType: 'success' });
        window.location.reload();
      } else {
        showToast("Couldn't delete agency!", { toastType: 'error' });
      }
    } catch (error) {
      console.error('An error occurred while deleting agency:', error);
      showToast("An error occurred while deleting agency.", { toastType: 'error' });
    }
  }

  const deleteCompany = async (id) => {
    try {
      const response = await regularApiRequest({
        url: base_url + 'company/' + id,
        method: 'DELETE',
      });

      if (response.status === 200) {
        showToast("Company deleted!", { toastType: 'success' });
        window.location.reload();
      } else {
        showToast("Couldn't delete company!", { toastType: 'error' });
      }
    } catch (error) {
      console.error('An error occurred while deleting company:', error);
      showToast("An error occurred while deleting company.", { toastType: 'error' });
    }
  }

  const [agencyFormData, setAgencyFormData] = useState({
    agencyName: '',
    agencyDescription: '',
    agencyEmail: '',
    agencyPhone: '',
    agencyAddress: '',
    agencyWebsite: '',
  });

  const handleAgencyChange = (event) => {
    const { name, value } = event.target;
    setAgencyFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAgencySubmit = async (event) => {
    event.preventDefault()
    const reqBody = {
      name: agencyFormData.agencyName,
      description: agencyFormData.agencyDescription,
      email: agencyFormData.agencyEmail,
      phone: agencyFormData.agencyPhone,
      address: agencyFormData.agencyAddress,
      website: agencyFormData.agencyWebsite,
    }

    const response = await regularApiRequest({
      url: base_url + 'agency',
      method: 'POST',
      reqBody: reqBody,
    })

    if (response.status === 200) {
      event.target.reset();
      showToast("New Agency Added!", { toastType: 'success' })
      window.location.reload()
    } else {
      showToast("Couldn't add Agency", { toastType: 'error' })
    }
  }

  const [companyFormData, setCompanyFormData] = useState({
    companyName: '',
    companyDescription: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    companyWebsite: '',
  });

  const handleCompanyChange = (event) => {
    const { name, value } = event.target;
    setCompanyFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanySubmit = async (event) => {
    event.preventDefault()
    const reqBody = {
      name: companyFormData.companyName,
      description: companyFormData.companyDescription,
      email: companyFormData.companyEmail,
      phone: companyFormData.companyPhone,
      address: companyFormData.companyAddress,
      website: companyFormData.companyWebsite,
    }

    const response = await regularApiRequest({
      url: base_url + 'company',
      method: 'POST',
      reqBody: reqBody,
    })

    if (response.status === 200) {
      event.target.reset();
      showToast("New Company Added!", { toastType: 'success' })
      window.location.reload()
    } else {
      showToast("Couldn't add Company", { toastType: 'error' })
    }
  }

  return (
    <div>
      <center>
        <h1>Admin Dashboard</h1> </center>
      <br />

      {data && data.unverifiedUsers.length > 0 && <h2>Unverified Users</h2>}
      {data && data.unverifiedUsers.length > 0 && <TableUnverifiedUserList tableData={data.unverifiedUsers} />}
      <br />
      <Divider />
      <br />

      <h2>Add New Tag</h2>
      <Grid columns={2}>
        <Grid.Column width={3}>
          <Menu compact>
            {tagsData && (
              <Dropdown text='List Of Existing Tags' simple item>
                <Dropdown.Menu>
                  {tagsData.tags.map((tag) => (
                    <Dropdown.Item key={tag.id}>{tag.tag}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Menu>
        </Grid.Column>
        <Grid.Column width={13}>
          <Form onSubmit={addNewTag} style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Field style={{ marginRight: '10px' }}>
              <Input id="tagName" name="tagName" label="Tag Name" type="text" placeholder="new tag" required={true} />
            </Form.Field>
            <Button type="submit" primary style={{ width: 'auto', height: '35px' }}>Add Tag</Button>
          </Form>
        </Grid.Column>
      </Grid>

      <br />
      <Divider />
      <br />

      <Grid columns={2}>
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
              <Form.Input id="agencyName" name="agencyName" label="Name" type="text" value={agencyFormData.name} placeholder="name" required={true} onChange={handleAgencyChange} />
            </Form.Field>
            <Form.Field>
              <TextArea
                id="agencyDescription" name="agencyDescription" label="Description" value={agencyFormData.description} placeholder="write something about this agency..." onChange={handleAgencyChange} />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Input
                id="agencyEmail" name="agencyEmail" label='Email' type="email" value={agencyFormData.email} placeholder='example@gmail.com' required={true} onChange={handleAgencyChange} />
              <Form.Input
                id="agencyPhone" name="agencyPhone" label='Phone' type="tel" value={agencyFormData.phone} placeholder='01xxxxxxxx' required={true} onChange={handleAgencyChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                id="agencyAddress" name="agencyAddress" label='Address' value={agencyFormData.address} placeholder='Dhaka, Bangladesh' onChange={handleAgencyChange} />
              <Form.Input
                id="agencyWebsite" name="agencyWebsite" label='Website URL' type="url" value={agencyFormData.website} placeholder='www.example.com' onChange={handleAgencyChange} />
            </Form.Group>
            <Button type="submit" primary>Add Agency</Button>
          </Form>
        </Grid.Column>
      </Grid>

      <br />
      <br />
      <Divider />

      <Grid columns={2} >
        <Grid.Column width={10}>
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
                      <Button color='red' onClick={() => deleteCompany(currItem.id)}>Delete</Button>
                    </Table.Cell>

                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Grid.Column>

        <Grid.Column width={6}>
          <h2>Add New Company</h2>
          <Form onSubmit={handleCompanySubmit}>
            <Form.Field>
              <Form.Input id="companyName" name="companyName" label="Name" type="text" value={companyFormData.name} placeholder="name" required={true} onChange={handleCompanyChange} />
            </Form.Field>
            <Form.Field>
              <TextArea
                id="companyDescription" name="companyDescription" label="Description" value={companyFormData.description} placeholder="write something about this company..." onChange={handleCompanyChange} />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Input
                id="companyEmail" name="companyEmail" label='Email' type="email" value={companyFormData.email} placeholder='example@gmail.com' required={true} onChange={handleCompanyChange} />
              <Form.Input
                id="companyPhone" name="companyPhone" label='Phone' type="tel" value={companyFormData.phone} placeholder='01xxxxxxxx' required={true} onChange={handleCompanyChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                id="companyAddress" name="companyAddress" label='Address' value={companyFormData.address} placeholder='Dhaka, Bangladesh' onChange={handleCompanyChange} />
              <Form.Input
                id="companyWebsite" name="companyWebsite" label='Website URL' type="url" value={companyFormData.website} placeholder='www.example.com' onChange={handleCompanyChange} />
            </Form.Group>
            <Button type="submit" primary>Add Company</Button>
          </Form>
        </Grid.Column>
      </Grid>

    </div>
  )
}

export { AdminDashboard }