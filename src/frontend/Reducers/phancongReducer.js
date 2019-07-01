import {PHAN_CONG} from '../Constant/ActionType';
const initialState = {
    phancongTable: []
}

export function phancongReducer(state = initialState, action) {

    switch(action.type) {
        case PHAN_CONG:
            return {
                ...state,
                phancongTable: action.data
            }
        default: 
        return state;
    }
}