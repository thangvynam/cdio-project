import * as Types from '../../Constant/thong-tin-chung/actionTypes';
import _ from 'lodash'
import $ from './../../helpers/services'



const collectDataRequest = (id) => {
    return (dispatch) => {
        return $.collectData1(id).then(function (response) {
            dispatch(fetchData(response.data));
        })
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