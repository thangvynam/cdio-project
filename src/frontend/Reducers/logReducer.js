import { UPDATE_CON_TAB, IS_LOAD_LOG,SHOW_INPUT_COMMENT } from "../Constant/ActionType";


const itemLayout2InitialState = {
    contentTab: '',
    isLoaded: false,
    idLog : -1,
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
        case SHOW_INPUT_COMMENT:{
            return{
                ...state,
                idLog: action.id
            }
        }
        default:
            return state
    }
}
export default logReducer;