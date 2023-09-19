import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState, useRef } from "react";
import { Checkbox, Input } from 'semantic-ui-react';
import s3 from '../../config/s3';
import { base_s3_url, base_url } from '../..';
import { regularApiRequest } from '../api/regularApiRequest';

const RequestApprovalModal = (props) => {
    const fileRef = useRef(null);
    const [checked, setChecked] = useState(false)
    

    const handleSubmit = async () => {
        const file = fileRef.current.inputRef.current.files[0]
        let fileName = null
        if (checked && file) {
            fileName = 'tasks/' + props.singleTask.id + '/' + file.name
            console.log(fileName)
            props.setFile(fileName)
            try {
                const params = {
                    Bucket: 'cpm-backend',
                    Key: fileName,
                    Body: file,
                }
                s3.putObject(params).promise().then((res) => {
                    console.log('file uploaded', res)

                }).catch((err) => {
                    console.log(err)
                })
                fileName = base_s3_url + '/' + fileName
            } catch (err) {
                console.log(err)
            }
        }
        props.sendApprovalRequest(props.singleTask.id, fileName)
        props.setShow(false)
    }
  return (
    <Modal
        show={props.show}
        onHide={() => props.setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header>
        <Modal.Title>Request Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
            {/* <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                Write a message to the client
                </label>
                <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                ></textarea>
            </div>
            </div> */}
            
            <Checkbox className='mb-4' label='Include Sample' checked={checked} onChange={() => setChecked(!checked)} />
        
            <Input fluid type="file" ref={fileRef} disabled={!checked} />
        </div>
        </Modal.Body>
        <Modal.Footer>
        <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
        >
            Send
        </button>
        </Modal.Footer>
    </Modal>
  )
}

export default RequestApprovalModal