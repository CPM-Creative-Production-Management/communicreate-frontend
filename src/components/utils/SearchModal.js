import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Input, Dimmer, Loader, Card, List, Divider } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';
import { commentApiRequest } from '../api/commentApiRequest';
import { base_url } from '../..';
import { showToast } from '../../App';
import { regularApiRequest } from '../api/regularApiRequest';
import SingleSearchItem from '../cards/SingleSearchItem';
import { Divide } from 'lucide-react';

export default function SearchModal({ open, setOpen }) {
    const [searchText, setSearchText] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const [searchResults, setSearchResults] = React.useState([])

    const getSearchResults = async () => {
        setLoading(true)
        const response = await commentApiRequest({
            url: base_url + `search?keyword=${searchText}`,
            method: 'GET',
        })


        if (response.status === 200) {
            console.log(response.data)

            setSearchResults(response.data)
            setLoading(false)
        } else {
            showToast('something went wrong', 'error')
            setLoading(false)
        }
    }



    const onTextChange = (e) => {
        console.log(e.target.value)
        setSearchText(e.target.value)




    }

    useEffect(() => {
        if (searchText.length >= 0) {
            getSearchResults()
        } else {
            setSearchResults([])
        }
    }, [searchText])



    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal scrollable show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Anything...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input value={searchText} onChange={onTextChange} name='search' fluid loading={false} placeholder='Search...' />


                    <br />
                    <Loader active={loading} inline='centered' />


                    {searchResults.estimation?.map((item) => {
                        return (
                            <SingleSearchItem data={item} type='estimation' />
                        )
                    }
                    )}



                    {searchResults.agency?.map((item) => {
                        return (
                            <SingleSearchItem data={item} type='agency' />
                        )
                    }
                    )}

                    {searchResults.company?.map((item) => {
                        return (
                            <SingleSearchItem data={item} type='company' />
                        )
                    }
                    )}

                    {searchResults.employee?.map((item) => {
                        return (
                            <SingleSearchItem data={item} type='employee' />
                        )
                    }
                    )}













                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>


        </div>
    );
}