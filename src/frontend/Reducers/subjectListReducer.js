import { SUBJECT_LIST, SUBJECT_ID } from '../Constant/ActionType';
const initialState = {
    "de-cuong-mon-hoc" :{
        name: "ĐỀ CƯƠNG MÔN HỌC",
        "de-cuong-mon-hoc": [
            {
                id: "001",
                title: "Phương pháp lập trình hướng đối tượng",
            },
            {
                id: "002",
                title: "Design Pattern"
            }
            ],
    },
    "metrics": {
        name: "METRICS",
        "metrics": [
        {
            id: "003",
            title: "Mạng máy tính",
        },
        {
            id: "004",
            title: "Kiến trúc phần mềm"
        }  
        ]
    }
}

export function subjectListReducer(state = initialState, action) {

    switch(action.type) {
        case SUBJECT_LIST:
        return action.subjectlist;
        default: 
        return state;
    }
}

const initialSubjectId = "";
export function subjectIdReducer(state = initialSubjectId, action) {

    switch(action.type) {
        case SUBJECT_ID:
        return action.subjectid;
        default: 
        return state;
    }
}