import React, {useState, useEffect} from 'react';
import { useApiRequest } from '../api/useApiRequest';
import { regularApiRequest } from '../api/regularApiRequest';
import { base_url } from '../..';
import { SingleEstimationCard } from '../cards/SingleEstimationCard';
import { Pagination } from 'semantic-ui-react';

export const ArchiveCompleted = ({finished}) => {

    let url_prefix
    if (finished) {
        url_prefix = `${base_url}request/agency/finished/`
    } else {
        url_prefix = `${base_url}request/agency/rejected/`
    }

    const {data, dataLoading, error} = useApiRequest({
        // url: `${base_url}request/agency/finished/?page=1`
        url: `${url_prefix}?page=1`,
        method: 'GET'
    })

    const [activePage, setActivePage] = useState(1)
    const [estimations, setEstimations] = useState([])

    useEffect(() => {
        if (data) {
            setEstimations(data.requests)
        }
    }, [data])

    const handleActivePageChange = async (activePage) => {
        const response = await regularApiRequest({
            // url: `${base_url}request/agency/finished/?page=${activePage}`,
            url: `${url_prefix}?page=${activePage}`,
            method: 'GET'
        })
        if (response.status === 200) {
            setEstimations(response.data.requests)
        }
    }

    return (
        <div>
           {
                estimations?.map((curEstimation, index) => {
                    return (
                        <div>
                            <SingleEstimationCard 
                                key={index} 
                                estimationData={curEstimation}
                                isAgencyArchive={true}
                                isArchived={true}
                            />
                            <br/>
                        </div>
                    )
                })
           }

                <Pagination
                    pointing
                    secondary
                    firstItem={null}
                    lastItem={null}
                    defaultActivePage={1} 
                    // totalPages={data? data.totalPages : 1}
                    totalPages={data? data.totalPages : 1}
                    activePage={activePage}
                    onPageChange={(e, { activePage }) => {
                        setActivePage(activePage)
                        handleActivePageChange(activePage)
                    }}
                />

        </div>
    );
}