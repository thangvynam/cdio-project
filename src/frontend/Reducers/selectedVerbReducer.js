import { SELECTED_VERB } from '../Constant/ActionType';

const initialState = {
    level: "",
    verb: ""
};

export default function selectedVerbReducer(state = initialState, action) {

    switch(action.type) {
        case SELECTED_VERB:
        return action.verb;
        default: 
        return state;
    }
}