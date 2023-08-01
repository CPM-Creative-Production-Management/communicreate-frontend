import axios from "axios";
import {setLoading, showToast} from "../../App";
import {useEffect, useState} from "react";


export const usePublicGetReq = ({url, reqBody={}, requestHeaders}) => {
    const [data, setData] = useState(null);
    const [dataLoading, setDataLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true)
            setDataLoading(true)
            console.log('url', url)
            console.log('reqBody', reqBody)
            console.log('requestHeaders', requestHeaders)

            try {
                const response = await axios.post(url, reqBody, {headers: requestHeaders})
                console.log('resp', response.data)
                setData(response.data)

            } catch (error) {
                console.log(error)
                setError(error)
                showToast("Error fetching data", "error")
            } finally {
                setLoading(false)
                setDataLoading(false)
            }


        })()

    }, [url]);

    return {data, dataLoading, error}
}



