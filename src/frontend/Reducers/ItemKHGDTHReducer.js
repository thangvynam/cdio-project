import { ADD_ITEM_KHGDTH } from '../Constant/ActionType';

const initialState = {
    previewInfo: []
}
const itemKHGDTHReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_KHGDTH:
            return {
                ...state,
                previewInfo: [...state.previewInfo, JSON.parse(action.data)]
            }
        default:
            return state
    }
}
export default itemKHGDTHReducer;