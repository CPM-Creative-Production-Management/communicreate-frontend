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
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function SearchModal({ open, setOpen }) {

    const navigate = useNavigate()
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
        if (searchText.length >= 1) {
            getSearchResults()
        } else {
            setSearchResults([])
        }
    }, [searchText])


    const navigateTo = (url) => {

        navigate(`${url}`)


        window.location.reload()
    }

    const [currModalOpen, setCurrModalOpen] = React.useState(open)


    const handleClose = (url) => {
        setOpen(false);
        setCurrModalOpen(false);

        setTimeout(() => {
            window.location.reload()
        }, 10)

        // navigateTo(url)
    };

    const handleCloseBtn = () => {
        setOpen(false);

    }
  

    return (
        <div>
            <Modal className={`modal-${currModalOpen ? 'open' : 'closed'}`} scrollable show={open} onHide={handleClose}>

                {/* <Modal.Title>Search Anything...</Modal.Title> */}

                <Input loading={loading} className='ms-4 me-4 mt-4 mb-3' value={searchText} onChange={onTextChange} name='search' fluid placeholder='Search...' />

                <Modal.Body>

                    {searchResults.estimation?.map((item) => {
                        return (
                            <Link to={`${item.url}`} style={{ textDecoration: 'none', color: 'black', }}>
                                <div onClick={() => {
                                    handleClose()
                                }} >
                                    <SingleSearchItem data={item} type='estimation' closeModal={handleClose} />
                                </div>
                            </Link>
                        )
                    }
                    )}



                    {searchResults.agency?.map((item) => {
                        return (
                            <SingleSearchItem data={item} type='agency' closeModal={handleClose} />
                        )
                    }
                    )}



                    {searchResults.employee?.map((item) => {
                        return (
                            <SingleSearchItem data={item} type='employee' closeModal={handleClose} />
                        )
                    }
                    )}



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBtn}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>


        </div>
    );
}