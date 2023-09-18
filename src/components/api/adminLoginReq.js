import axios from "axios";
import {base_url} from "../../index";
import Cookies from "universal-cookie";
import {setLoading, showToast} from "../../App";

import {updateCurrProfile} from "../../actions";


export const AdminLoginReq = (reqBody, navigate, dispatch) => {

    const cookies = new Cookies();


    (async () => {
        setLoading(true)

        try {
            const response = await axios.post(base_url + 'admin/login', reqBody)
            console.log('login resp', response.data)

            dispatch(updateCurrProfile(response.data.user))

            cookies.set('token', response.data.token, {path: '/'});
            cookies.set('userName', response.data.user.name, {path: '/'})
            cookies.set('userType', response.data.user.type, {path: '/'})

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