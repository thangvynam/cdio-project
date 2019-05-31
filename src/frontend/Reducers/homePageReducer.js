import { MENU_ITEM, SUBJECT_ID, SUBJECT_LIST, SUBJECT_MASO, CDR_CDIO, CTDT, PARENT_ITEM , KTT} from '../Constant/ActionType';
const initialState = {
    "chuan-dau-ra" :{
        name: "CHUẨN ĐẦU RA",
    },
    "phan-cong-giang-day" :{
        name: "PHÂN CÔNG GIẢNG DẠY",
    },
    "de-cuong-mon-hoc" :{
        name: "ĐỀ CƯƠNG MÔN HỌC",
    },
    "survey-matrix" :{
        name: "SURVEY MATRIX",
    },
    "matrix": {
        name: "MATRIX",
    },
    "benchmark-matrix": {
        name: "BENCHMARK-MATRIX",
    },
    "edit-matrix": {
        name: "EDIT-MATRIX"
    },
    "itusurvey": {
        name: "ITU SURVEY"
    },
    "view-survey": {
        name: "QUẢN LÝ SURVEY"
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

const initialCdrCdio = [];
export function cdrCdioReducer(state = initialCdrCdio, action) {

    switch(action.type) {
        case CDR_CDIO:
        return action.cdrcdio;
        default: 
        return state;
    }
}

const parentState = [
    {
        id: "ctdt",
        name: "CHƯƠNG TRÌNH ĐÀO TẠO"
    },
    {
        id: "danh-muc",
        name: "DANH MỤC"
    },
    {
        id: "cdr",
        name: "CHUẨN ĐẦU RA"
    },
    {
        id: "qlhp",
        name: "QUẢN LÝ HỌC PHẦN"
    },
    {
        id: "qlkh",
        name: "QUẢN LÝ KHOA HỆ"
    },
    {
        id: "qlgd",
        name: "QUẢN LÝ NGƯỜI DÙNG"
    },
    {
        id: "info",
        name: "THÔNG TIN TÀI KHOẢN"
    }
]

export function parentItemReducer(state = parentState, action) {

    switch(action.type) {
        case PARENT_ITEM:
        return action.parentitem;
        default: 
        return state;
    }
}