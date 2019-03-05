import {ADD_DATA_LAYOUT_3, DELETE_DATA_LAYOUT_3, SAVE_DATA_LAYOUT_3} from '../Constant/ActionType';

const itemLayout3InitialState = {
    previewInfo: []
}
const ItemLayout3Reducer = (state = itemLayout3InitialState, action) => {
    switch (action.type) {
        case ADD_DATA_LAYOUT_3:
            return {
                ...state,
                previewInfo: [...state.previewInfo, JSON.parse(action.item)]
            }
        case DELETE_DATA_LAYOUT_3:  
        console.log(state.previewInfo)
            console.log(action.key)          
            state.previewInfo= state.previewInfo.filter((_, item) => item !== action.key)
            return {
                ...state,
                previewInfo: state.previewInfo
            }
        case SAVE_DATA_LAYOUT_3:
        return {
            ...state, 
            previewInfo: action.data
        }
        default:
            return state
    }
}
export default ItemLayout3Reducer;