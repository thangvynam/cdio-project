import { ADD_CDRDATA, CHANGE_CDRDATA, CHANGE_EDITSTATE, 
    SELECTED_CDRITEM, SELECTED_VERB, CDRMDHD, MTMH, ISLOAD, SAVE_LOG } from '../Constant/ActionType';

const addCDRDataState = {
    previewInfo: [],
    logData: []
};

export function itemLayout4Reducer(state = addCDRDataState, action) {

    switch(action.type) {
        case ADD_CDRDATA:
            return action.data;
        case SAVE_LOG: {
            let obj = {
                ten: action.ten,
                timestamp: action.timestamp,
                noi_dung: action.noi_dung,
                muc_de_cuong: action.muc_de_cuong,
                thong_tin_chung_id: action.thong_tin_chung_id
            }          
            return {
                ...state,
                logData: [...state.logData, obj]
            }
            }      
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

const cdrmdhdState = [];

export function cdrmdhdReducer(state = cdrmdhdState, action) {

    switch(action.type) {
        case CDRMDHD:
        return action.cdrmdhd;
        default: 
        return state;
    }
}

const mtmhState = [];

export function mtmhReducer(state = mtmhState, action) {

    switch(action.type) {
        case MTMH:
        return action.mtmh;
        default: 
        return state;
    }
}

const isLoadState = "false";

export function isLoadReducer(state = isLoadState, action) {

    switch(action.type) {
        case ISLOAD:
        return action.isload;
        default: 
        return state;
    }
}