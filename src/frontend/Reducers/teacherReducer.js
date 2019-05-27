import { LOAD_TEACHER} from '../Constant/ActionType';
const initialState = {
    previewInfo: []
}

export default function teacherReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TEACHER:
            return { 
                ...state,
                previewInfo: action.teacherlist
            };
        default:
            return state;
    }
}