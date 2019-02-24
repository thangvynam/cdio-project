import {ADD_DATA,DELETE_DATA_LAYOUT_5} from '../Constant/ActionType';

const itemMenuInitialState = {
    previewInfo: []
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
        default:
            return state
    }
}
export default itemMenuReducer;