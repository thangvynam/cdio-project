import * as Types from './../../constants/action-types/thong-tin-chung';

var initialState = {
    messageSuccess: '',
    messageError: ''
}

const thongTinChung = (state = initialState, action) => {
    switch (action.type) {
        case Types.HANDLE_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case Types.HANDLE_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                messageSuccess: '',
            }
        }
        case Types.RESET_STORE: {
            return {
                ...state,
                messageError: '',
                messageSuccess: '',
            }
        }
        default:
            return { ...state };
    }
}

export default thongTinChung;
