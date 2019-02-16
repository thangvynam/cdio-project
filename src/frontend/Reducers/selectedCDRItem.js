import { SELECTED_CDRITEM } from '../Constant/ActionType';

const initialState = [];

export default function selecteCDRItemReducer(state = initialState, action) {

    switch(action.type) {
        case SELECTED_CDRITEM:
        return action.item;
        default: 
        return state;
    }
}