import { MENU_ITEM, SUBJECT_ID, SUBJECT_LIST, SUBJECT_MASO } from '../Constant/ActionType';
const initialState = {
    "de-cuong-mon-hoc" :{
        name: "ĐỀ CƯƠNG MÔN HỌC",
    },
    "matrix": {
        name: "MATRIX",
    },
    "edit-matrix": {
        name: "EDIT-MATRIX"
    }
}

export function menuItemReducer(state = initialState, action) {

    switch(action.type) {
        case MENU_ITEM:
        return action.menuitem;
        default: 
        return state;
    }
}

const subjectlistState = []

export function subjectListReducer(state = subjectlistState, action) {

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

const initialSubjectMaso = "";
export function subjectMasoReducer(state = initialSubjectMaso, action) {

    switch(action.type) {
        case SUBJECT_MASO:
        return action.subjectmaso;
        default: 
        return state;
    }
}