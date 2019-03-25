import { UPDATE_CON_TAB } from "../Constant/ActionType";


const itemLayout2InitialState = {
    contentTab: ''
}

const logReducer = (state = itemLayout2InitialState, action) => {
    switch (action.type) {
        case UPDATE_CON_TAB: {      
            return {
                ...state,
                contentTab: action.data
            }
        }
        default:
            return state
    }
}
export default logReducer;