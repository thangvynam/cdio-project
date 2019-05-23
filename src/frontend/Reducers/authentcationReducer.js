import * as Types from '../Constant/auth/authActionType';

const initialState = {
    previewInfo: [],
    messageErr: '',
    isSuccess: false,
    isLoading: false,
    userObj: {}
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN:
            return { 
                ...state,
                isSuccess: true,
                userObj: action.userObj
            };
        default:
            return state;
    }
}