import * as Types from '../../Constant/thong-tin-chung/actionTypes';
import _ from 'lodash'
import axios from 'axios'
import $ from './../../helpers/services'

const collectDataRequest = (id) => {
    return (dispatch) => {
        // return axios(`/collect-data/${id}`, {
        //     method: "GET",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "token": `${localStorage.getItem('token')}`
        //     }
        // })
        return $.collectData1(id).then(function (response) {
                dispatch(fetchData(response.data));
            })
            // .catch(function (error) {
            //     window.location.href = 'http://localhost:3000/';
            // });
    }
}

const fetchData = (newTTC) => {
    return {
        type: Types.FETCH_DATA,
        newTTC
    }
}

// const updateTTCRequest = (id, data) => {
//     return (dispatch) => {
//         axios({
//             method: 'post',
//             url: `/update-data/${id}`,
//             data
//         }).then(function (response) {
//             if (response.data === "SUCCESS") {
//                 dispatch(fetchData(data));
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//     }
// }

const updateTTCRequest = (id, data) => {
    return (dispatch) => {
        $.updateData1(id, data).then(function (response) {  
                dispatch(fetchData(data));
        })
    }
}

export {
    collectDataRequest,
    fetchData,
    updateTTCRequest,
}