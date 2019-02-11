import {ADD_DATA_LAYOUT_2} from '../Constant/ActionType';

const itemLayout2InitialState = {
    description: ''
}
const ItemLayout2Reducer = (state = itemLayout2InitialState, action) => {
    switch (action.type) {
        case ADD_DATA_LAYOUT_2:
            return {
                ...state,
                description: action.description
            }
        default:
            return state
    }
}
export default ItemLayout2Reducer;