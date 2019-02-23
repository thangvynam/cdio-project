import * as Types from '../../constants/action-types/thong-tin-chung';
import callApi from '../../utils/callApi';

const actAddSuccess = () => {
    return {
        type: Types.HANDLE_SUCCESS,
        messageSuccess: "Success!!!"
    }
}

const actAddFail = () => {
    return {
        type: Types.HANDLE_FAIL,
        messageSuccess: "Fail!!!"
    }
}

const resetStore = () => {
    return (dispatch) => {
        dispatch({
            type: Types.RESET_STORE,
        });
    }
}

export {
    actAddSuccess,
    actAddFail,
    resetStore
}