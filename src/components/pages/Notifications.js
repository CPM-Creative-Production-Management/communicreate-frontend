import { useEffect, useState } from 'react'
import React from 'react'
import { base_url } from '../..'
import SingleNotification from '../cards/SingleNotification'
import { Comment, Divider, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import { regularApiRequest } from '../api/regularApiRequest'

const Notifications = () => {

    const [activePage, setActivePage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [queueItems, setQueueItems] = React.useState([]);

    const handlePaginationChange = (e, { activePage }) => {
        setActivePage(activePage)
        // updateQueue(activePage)

        console.log(activePage)
    }

    const updateQueue = () => {

        const response = regularApiRequest({
            url: base_url + `notification/?page=${activePage}`,
            method: 'GET'
        })

        response.then((res) => {
            console.log(res.data)

            setTotalPages(res.data.totalPages)

            setQueueItems(res.data)
        })

        // axios.get(base_url + `notification/?page=${activePage}`).then((res) => {

        //     console.log(res.data)

        //     setTotalPages(res.data.totalPages)

        //     setQueueItems(res.data)

        // })
    }

    useEffect(() => {
        updateQueue()
    }, [])

    useEffect(() => {
        updateQueue()

    }, [activePage])

    useEffect(() => {
        console.log(queueItems)
    }, [queueItems])





    return (
        <div >

            <h1>Notifications</h1>

            <br />


            {queueItems.notifications?.map((notification) => {
                return (
                    <div className='ms-2'>

                        <Comment.Group >
                            <SingleNotification singleNotification={notification} />
                            <br />
                            {/* <Divider /> */}
                        </Comment.Group>
                    </div>
                )
            })
            }


            <Pagination
                pointing secondary
                activePage={activePage}
                boundaryRange={1}
                onPageChange={handlePaginationChange}
                size='mini'
                siblingRange={1}
                totalPages={totalPages}
                ellipsisItem={undefined}
                firstItem={true}
                lastItem={true}
                prevItem={undefined}
                nextItem={undefined}
            />

            <br />
            <br />




        </div>
    )
}

export default Notifications