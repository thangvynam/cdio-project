import { MENU_ITEM, SUBJECT_ID, SUBJECT_LIST, SUBJECT_MASO, CDR_CDIO, CTDT, PARENT_ITEM , KTT,UPDATE_ID_SURVEY} from '../Constant/ActionType';
const initialState = {
    "chuan-dau-ra" :{
        name: "ĐÁNH GIÁ CHUẨN ĐẦU RA",
    },
    "khao-sat-chuan-dau-ra" :{
        name: "KHẢO SÁT CHUẨN ĐẦU RA",
    },
    "phan-cong-giang-day" :{
        name: "PHÂN CÔNG GIẢNG DẠY",
    },
    "de-cuong-mon-hoc" :{
        name: "ĐỀ CƯƠNG MÔN HỌC",
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
    },
    {
        id: "view-survey",
        name: "QUẢN LÝ SURVEY"
    },
    {
        id: "survey-matrix",
        name: "SURVEY MATRIX",
    },
    
]

export function parentItemReducer(state = parentState, action) {

    switch(action.type) {
        case PARENT_ITEM:
        return action.parentitem;
        default: 
        return state;
    }
}

const initialIdSurvey =
    {
        idSurvey : "",
    }

export function idSurveyReducer(state = initialIdSurvey, action) {

    switch(action.type) {
        case UPDATE_ID_SURVEY:{
            return{
                ...state,
                idSurvey : action.data,
            }
        }
        default: 
        return state;
    }
}