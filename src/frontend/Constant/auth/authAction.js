import * as Types from '../../Constant/auth/authActionType';
import _ from 'lodash';
import axios from 'axios';


const userPostFetch = (user) => {
    return dispatch => {
        return axios({
            url: '/login',
            method: "POST",
            data: user
        }).then((res) => {
            if(res.data.message === "User dose not exist"){

            }else if(res.data.message === "Password is not correct"){

            }else if(res.data.message === "Success"){
                window.localStorage.setItem('token', res.data.token);
                window.localStorage.setItem('roles', res.data.roles)
                window.location.replace("http://localhost:3000/home");
            }
        }).catch((err) => {
            console.log("ERR", err);
        })
    }
}

const loginUser = userObj => ({
    type: 'LOGIN',
    userObj
})

export {
    userPostFetch
}