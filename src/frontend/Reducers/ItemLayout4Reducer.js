import { ADD_CDRDATA, CHANGE_CDRDATA, CHANGE_EDITSTATE, 
    SELECTED_CDRITEM, SELECTED_VERB } from '../Constant/ActionType';

const addCDRDataState = {
    previewInfo: [{
    key: "1",
    cdr: 'G1.1',
    level_verb: ["SKILL", "3"],
    description: 'Thành lập, tổ chức, vận hành và quản lý nhóm',
    levels: ["I", "U"],
  }, {
    key: "2",
    cdr: 'G1.2',
    level_verb: ["KNOWLEDGE", "2"],
    description: 'Phân biệt được sự khác nhau giữa các mô hình phát triển phần mềm: mô hình thác nước, mô hình tiến hóa, mô hình phát triển dựa trên component có sẵn',
    levels: ["U"],
  }, {
    key: "3",
    cdr: 'G2.1',
    level_verb: ["ATTITUDE", "4"],
    description: 'Giải thích được thuật ngữ tiếng Anh chuyên ngành của môn học',
    levels: ["I", "T", "U"],
  }]
};

export function itemLayout4Reducer(state = addCDRDataState, action) {

    switch(action.type) {
        case ADD_CDRDATA:
        return action.data;
        default: 
        return state;
    }
}

const changeCDRDataState = {
    cdr: "",
    level_verb: [],
    description: "",
    levels: []
};

export function changeCDRDataReducer(state = changeCDRDataState, action) {

    switch(action.type) {
        case CHANGE_CDRDATA:
        return action.data;
        default: 
        return state;
    }
}

const changeEditStateState = '';

export function changeEditStateReducer(state = changeEditStateState, action) {

    switch(action.type) {
        case CHANGE_EDITSTATE:
        return action.editstate;
        default: 
        return state;
    }
}

 
// export function changeLevelDataReducer(state = changeLevelDataState, action) {

//     switch(action.type) {
//         case CHANGE_LEVEL_DATA:
//         return action.leveldata;
//         default: 
//         return state;
//     }
// }

const selecteCDRItemState = [];

export function selecteCDRItemReducer(state = selecteCDRItemState, action) {

    switch(action.type) {
        case SELECTED_CDRITEM:
        return action.item;
        default: 
        return state;
    }
}

const selectedVerbState = {
    level: "",
    childLevel: "",
    verb: ""
};

export function selectedVerbReducer(state = selectedVerbState, action) {

    switch(action.type) {
        case SELECTED_VERB:
        return action.verb;
        default: 
        return state;
    }
}