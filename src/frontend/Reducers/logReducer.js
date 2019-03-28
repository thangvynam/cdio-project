import { UPDATE_CON_TAB, IS_LOAD_LOG } from "../Constant/ActionType";


const itemLayout2InitialState = {
    contentTab: '',
    isLoaded: false,
}

const logReducer = (state = itemLayout2InitialState, action) => {
    switch (action.type) {
        case IS_LOAD_LOG: {            
            return {
                ...state,
                isLoaded: action.idLoaded
            }
        }
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