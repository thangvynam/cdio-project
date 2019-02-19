import {ADD_DATA_LAYOUT_3, DELETE_DATA_LAYOUT_3} from '../Constant/ActionType';

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
export default ItemLayout3Reducer;