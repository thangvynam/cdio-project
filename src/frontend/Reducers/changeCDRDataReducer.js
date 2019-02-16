import { CHANGE_CDRDATA } from '../Constant/ActionType';

const initialState = {
    cdr: "",
    description: "",
    levels: []
};

export default function changeCDRDataReducer(state = initialState, action) {

    switch(action.type) {
        case CHANGE_CDRDATA:
        return action.data;
        default: 
        return state;
    }
}