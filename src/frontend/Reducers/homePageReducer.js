import { MENU_ITEM, SUBJECT_ID, SUBJECT_LIST, SUBJECT_MASO, CDR_CDIO, CTDT, PARENT_ITEM } from '../Constant/ActionType';
const initialState = {
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
    "danhmuc": {
        name: "DANH MỤC"
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

const ctdtState = [
    {
        id: "ctdt-1",
        name: "CHÍNH QUY",
        children: [
            {
                id: "ktt-1",
                name: "KHỐI KIẾN THỨC TOÁN HỌC"
            },
            {
                id: "ktt-2",
                name: "KHỐI KIẾN THỨC VẬT LÝ"
            }
        ]
    },
    {
        id: "ctdt-2",
        name: "CAO ĐẲNG",
        children: [
            {
                id: "ktt-1",
                name: "KHỐI KIẾN THỨC TOÁN HỌC"
            },
            {
                id: "ktt-2",
                name: "KHỐI KIẾN THỨC VẬT LÝ"
            }
        ]
    }
];
export function ctdtReducer(state = ctdtState, action) {

    switch(action.type) {
        case CTDT:
        return action.ctdt;
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
        id: "cdr",
        name: "CHUẨN ĐẦU RA"
    },
    {
        id: "tab-3",
        name: "TAB 3"
    },
    {
        id: "tab-4",
        name: "TAB 4"
    },
    {
        id: "tab-5",
        name: "TAB 5"
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