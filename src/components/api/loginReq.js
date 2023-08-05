import axios from "axios";
import {base_url} from "../../index";
import Cookies from "universal-cookie";
import {setLoading, showToast} from "../../App";

import {updateCurrProfile} from "../../actions";


export const LoginReq = (reqBody, navigate, dispatch) => {
    const cookies = new Cookies();


    (async () => {
        setLoading(true)

        try {
            const response = await axios.post(base_url + 'account/login', reqBody)
            console.log('resp', response.data)

            dispatch(updateCurrProfile(response.data.user))

            cookies.set('token', response.data.token, {path: '/'});
            showToast("Logged in successfully", "success")
            setLoading(false)
            navigate('/')
        } catch (error) {
            console.log(error)
            setLoading(false)
            showToast("Error logging in", "error")
        }


    })()


}