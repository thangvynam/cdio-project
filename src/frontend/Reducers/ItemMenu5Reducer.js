import {ADD_DATA,DELETE_DATA_LAYOUT_5,CHANGE_EDITSTATE_5} from '../Constant/ActionType';

const itemMenuInitialState = {
    previewInfo: [],
    changeEditStateState:''
}

const itemMenuReducer = (state = itemMenuInitialState, action) => {
    switch (action.type) {
        case ADD_DATA:
            return {
                ...state,
                previewInfo: [...state.previewInfo, JSON.parse(action.item)]
            }
        case DELETE_DATA_LAYOUT_5:
            if(state.previewInfo.length === 1){
                state.previewInfo = []
            } else {              
                state.previewInfo= state.previewInfo.filter(item => item.key !== action.key)
            }
            return {
                ...state,
                previewInfo: state.previewInfo
            }
        case CHANGE_EDITSTATE_5:
            return {...state,changeEditStateState:action.key}
        default:
            return state
    }
}
export default itemMenuReducer;