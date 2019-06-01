import { DATA_CTDT, ISLOADED_DATA_CTDT, TEACHER_SUBJECT, TEACHER_REVIEW_SUBJECT } from '../Constant/ActionType';


const initialState = {
    data: [],
    isLoaded: false,
    teacherSubject: [],
    teacherReviewSubject: []
}


export function dataCtdtReducer(state = initialState, action) {

    switch(action.type) {
        case DATA_CTDT:
            return {...state,
                data: action.data 
            };
        case ISLOADED_DATA_CTDT:
            return {...state,
                isLoaded: action.data 
            };
        case TEACHER_SUBJECT:
        return {...state,
            teacherSubject: action.data 
        };
        case TEACHER_REVIEW_SUBJECT:
            return {...state,
                teacherReviewSubject: action.data 
            };
        default: 
        return state;
    }
}