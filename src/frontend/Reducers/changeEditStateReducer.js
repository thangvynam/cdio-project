import { CHANGE_EDITSTATE } from '../Constant/ActionType';

const initialState = '';

export default function changeEditStateReducer(state = initialState, action) {

    switch(action.type) {
        case CHANGE_EDITSTATE:
        return action.editstate;
        default: 
        return state;
    }
}