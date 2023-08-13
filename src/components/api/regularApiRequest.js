import axios from "axios";
import { setLoading, showToast } from "../../App";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";


export const regularApiRequest = async ({ url, method, reqBody = {} }) => {
    const cookies = new Cookies();

    const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get("token")}`
    }

    console.log('url', url)
    console.log('reqBody', reqBody)
    console.log('requestHeaders', requestHeaders)

    setLoading(true)

    try {
        if (method.toUpperCase() === "GET") {
            const response = await axios.get(url, { headers: requestHeaders })
            console.log('resp', response.data)
            setLoading(false)
            return response

        } else if (method.toUpperCase() === "POST") {
            const response = await axios.post(url, reqBody, { headers: requestHeaders })
            console.log('resp', response.data)
            setLoading(false)

            return response

        } else if (method.toUpperCase() === "PUT") {
            const response = await axios.put(url, reqBody, { headers: requestHeaders })
            console.log('resp', response.data)
            setLoading(false)

            return response
        } else if (method.toUpperCase() === "DELETE") {
            const response = await axios.delete(url, { headers: requestHeaders })

            console.log('resp', response.data)
            setLoading(false)

            return response
        }

    } catch (error) {
        console.log(error)
        setLoading(false)

        showToast("Error: " + error.message, "error")
    }

}