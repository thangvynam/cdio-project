import {ADD_DATA_LAYOUT_2, SAVE_DATA_LAYOUT_2} from '../Constant/ActionType';

const itemLayout2InitialState = {
    previewInfo: ''
}
const ItemLayout2Reducer = (state = itemLayout2InitialState, action) => {
    switch (action.type) {
        case ADD_DATA_LAYOUT_2:
            return {
                ...state,
                previewInfo: action.description
            }
        case SAVE_DATA_LAYOUT_2:
            return {
                ...state, 
                previewInfo: action.data[0].description
            }
        default:
            return state
    }
}
export default ItemLayout2Reducer;