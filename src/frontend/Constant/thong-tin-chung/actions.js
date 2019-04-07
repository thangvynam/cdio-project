import * as Types from '../../Constant/thong-tin-chung/actionTypes';
import _ from 'lodash'
import axios from 'axios'

const collectDataRequest = (id) => {
    return (dispatch) => {
        return axios.get(`/collect-data/${id}`)
            .then(function (response) {
                dispatch(fetchData(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

const fetchData = (newTTC) => {
    return {
        type: Types.FETCH_DATA,
        newTTC
    }
}

const updateTTCRequest = (id, data) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: `/update-data/${id}`,
            data
        }).then(function (response) {
            if (response.data === "SUCCESS") {
                dispatch(fetchData(data));
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export {
    collectDataRequest,
    fetchData,
    updateTTCRequest,
}