import {SHOW_TITLE} from '../Constant/ActionType';

const rightLayoutInitialState = {
    title : ''
}
const rightLayoutReducer = (state = rightLayoutInitialState, action) => {
    switch (action.type) {
        case SHOW_TITLE:
    
            return {...state,title:action.name};
        default:
            return state
    }
}
export default rightLayoutReducer;