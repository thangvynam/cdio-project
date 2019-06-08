import { MENU_ITEM, SUBJECT_ID, SUBJECT_LIST, SUBJECT_MASO, CDR_CDIO, CTDT, PARENT_ITEM , KTT,UPDATE_ID_SURVEY} from '../Constant/ActionType';
const initialState = {
    "edit-ctdt" :{
        name: "THÔNG TIN",
        role: ["ADMIN", "CHUNHIEM", "BIEN_SOAN", "TEACHER"],
        children: []
    },
    "chuan-dau-ra" :{
        name: "CHUẨN ĐẦU RA",
        role: ["ADMIN", "TEACHER", "BIEN_SOAN"],
        children: [
            {
                id: "chinhsua-cdr",
                name: "Chỉnh sửa chuẩn đầu ra",
                role: ["ADMIN", "CHUNHIEM", "BIEN_SOAN", "TEACHER"]
            },
            {
                id: "danhgia-cdr",
                name: "Đánh giá chuẩn đầu ra",
                role: ["ADMIN", "CHUNHIEM", "BIEN_SOAN", "TEACHER"]
            },
            {
                id: "khaosat-cdr",
                name: "Khảo sát chuẩn đầu ra",
                role: ["ADMIN", "CHUNHIEM", "BIEN_SOAN", "TEACHER"]
            },
        ]
    },
    "phan-cong-giang-day" :{
        name: "PHÂN CÔNG GIẢNG DẠY",
        role: ["ADMIN"],
        children: []
    },
    "de-cuong-mon-hoc" :{
        name: "ĐỀ CƯƠNG MÔN HỌC",
        role: ["TEACHER", "BIEN_SOAN", "CHUNHIEM"],
        children: [
            {
                id: "phancong",
                name: "Phân công",
                role: ["CHUNHIEM"]
            },
            {
                id: "biensoan",
                name: "Biên soạn",
                role: ["BIEN_SOAN"]
            },
            {
                id: "review-subject",
                name: "Review",
                role: ["TEACHER"]
            }
        ]
    },
    "matrix": {
        name: "MATRIX",
        role: ["BIEN_SOAN"],
        children: []
    },
    "benchmark-matrix": {
        name: "BENCHMARK-MATRIX",
        role: ["CHUNHIEM"],
        children: []
    },
    "edit-matrix": {
        name: "EDIT-MATRIX",
        role: ["CHUNHIEM"],
        children: []
    },
    "itusurvey": {
        name: "ITU SURVEY",
        role: ["CHUNHIEM", "BIEN_SOAN", "TEACHER"],
        children: []
    },
    "survey-matrix": {
        name: "SURVEY MATRIX",
        role: ["CHUNHIEM",],
        children: []
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
        name: "CHƯƠNG TRÌNH ĐÀO TẠO",
        role: ["ADIN", "CHUNHIEM", "BIEN_SOAN", "TEACHER"],
    },
    {
        id: "danh-muc",
        name: "DANH MỤC",
        role: ["ADMIN",],
    },
    {
        id: "cdr",
        name: "CHUẨN ĐẦU RA",
        role: ["TEACHER", "BIEN_SOAN"],
    },
    {
        id: "qlhp",
        name: "QUẢN LÝ HỌC PHẦN",
        role: ["BIEN_SOAN"],
    },
    {
        id: "qlkh",
        name: "QUẢN LÝ KHOA HỆ",
        role: ["BIEN_SOAN"],
    },
    {
        id: "qlnd",
        name: "QUẢN LÝ NGƯỜI DÙNG",
        role: ["ADMIN"],
    },
    {
        id: "info",
        name: "THÔNG TIN TÀI KHOẢN",
        role: ["ADMIN", "CHUNHIEM", "BIEN_SOAN", "TEACHER"],
    },
    {
        id: "view-survey",
        name: "QUẢN LÝ SURVEY",
        role: ["CHUNHIEM",],
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