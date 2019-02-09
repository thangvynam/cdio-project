import {ADD_DATA} from '../Constant/ActionType';

const itemMenuInitialState = {
    previewInfo: []
}
const itemMenuReducer = (state = itemMenuInitialState, action) => {
    switch (action.type) {
        case ADD_DATA:
        console.log(state.previewInfo)
            return {
                ...state,
                previewInfo: [...state.previewInfo, JSON.parse(action.item)]
            }
        default:
            return state
    }
}
export default itemMenuReducer;