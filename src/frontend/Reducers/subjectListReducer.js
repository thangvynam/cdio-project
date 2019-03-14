import { SUBJECT_LIST } from '../Constant/ActionType';
const initialState = {
    
    "de-cuong-mon-hoc": [
    {
        title: "Phương pháp lập trình hướng đối tượng",
    },
    {
        title: "Design Pattern"
    }
    ],


    "tab-2": [
    {
        title: "Mạng máy tính",
    },
    {
        title: "Kiến trúc phần mềm"
    }  
    ]
}



export function subjectListReducer(state = initialState, action) {

    switch(action.type) {
        case SUBJECT_LIST:
        return action.subjectlist;
        default: 
        return state;
    }
}