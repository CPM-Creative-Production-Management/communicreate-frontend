import { Button } from "semantic-ui-react";

import React from 'react'

const EditButton = (props) => {

    const handleEdit = () => {
        const data = {
            name: props.name,
            salary: props.salary,
            id: props.id,
            address: props.address
        }
        props.setEditData(data)
        props.onClick()
    }

  return (

    <div><Button onClick={handleEdit} primary>Edit</Button></div>
  )
}

export default EditButton