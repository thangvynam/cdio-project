import { LOAD_TEACHER} from '../Constant/ActionType';
const initialState = {
    previewInfo: [
        {
            id: "1",
            name: "Nguyễn Văn A",
            subjects: [1, 2]
        },
        {
            id: "2",
            name: "Nguyễn Văn B",
            subjects: [1, 4]
        },
        {
            id: "3",
            name: "Nguyễn Văn C",
            subjects: [3, 5]
        },
    ]
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