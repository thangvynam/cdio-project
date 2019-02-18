import { CHANGE_DGDATA } from '../Constant/ActionType';

const initialState = {
    standardOutput: '',
    mathanhphan:'',
    tenthanhphan:'',
    mota:'',
    tile: '',
};

export default function changeDGDataReducer(state = initialState, action) {

    switch(action.type) {
        case CHANGE_DGDATA:
        return action.data;
        default: 
        return state;
    }
}