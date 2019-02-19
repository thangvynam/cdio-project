import { CHANGE_TNDATA } from '../Constant/ActionType';

const initialState = {
    key: '',
    stt:'',
    loai: '',
    mota: '',
    link: ''
};

export default function changeTNDataReducer(state = initialState, action) {

    switch(action.type) {
        case CHANGE_TNDATA:
        return action.data;
        default: 
        return state;
    }
}