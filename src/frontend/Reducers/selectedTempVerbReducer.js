import { SELECTED_TEMP_VERB } from '../Constant/ActionType';

const initialState = "";

export default function selectedTempVerbReducer(state = initialState, action) {

    switch(action.type) {
        case SELECTED_TEMP_VERB:
        return action.tempverb;
        default: 
        return state;
    }
}