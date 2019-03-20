export const ADD_DATA = 'ADD_DATA';
export const ADD_DATA_LAYOUT_2 = 'ADD_DATA_LAYOUT_2';
export const SAVE_DATA_LAYOUT_2 = 'SAVE_DATA_LAYOUT_2';
export const SAVE_TEMP_DATA_LAYOUT_2 = 'SAVE_TEMP_DATA_LAYOUT_2';
export const SAVE_ALL_DATA_LAYOUT_2 = 'SAVE_ALL_DATA_LAYOUT_2';

//layout 3
export const ADD_DATA_LAYOUT_3 = 'ADD_DATA_LAYOUT_3';
export const DELETE_DATA_LAYOUT_3 = 'DELETE_DATA_LAYOUT_3';
export const SAVE_DATA_LAYOUT_3 = 'SAVE_DATA_LAYOUT_3';
export const SAVE_TEMP_DATA_LAYOUT_3 = 'SAVE_TEMP_DATA_LAYOUT_3';
export const SAVE_ALL_DATA_LAYOUT_3 = 'SAVE_ALL_DATA_LAYOUT_3';

// layout4
export const ADD_CDRDATA = 'ADD_CDRDATA';
export const CHANGE_CDRDATA = 'CHANGE_CDRDATA';
export const SELECTED_CDRITEM = 'SELECT_CDRITEM';
export const CHANGE_EDITSTATE = 'CHANGE_EDITSTATE';
export const CHANGE_LEVEL_DATA = 'CHANGE_LEVEL_DATA';
export const SELECTED_VERB = 'SELECTED_VERB';
export const SELECTED_TEMP_VERB = 'SELECTED_TEMP_VERB';
export const SUBJECT_LIST = 'SUBJECT_LIST';
export const SUBJECT_ID = 'SUBJECT_ID';

export const ADD_ITEM_KHGDTH = 'ADD_ITEM_KHGDTH';
export const UPDATE_KHGDTH = 'UPDATE_KHGDTH';
export const CHANGE_TEMP_KHGDTH = 'CHANGE_TEMP_KHGDTH';


export const ADD_ITEM_RULE = 'ADD_ITEM_RULE';
export const DELETE_ITEM_RULE = 'DELETE_ITEM_RULE';
export const UPDATE_RULES = 'UPDATE_RULES';
export const CHANGE_TEMP_RULES = 'CHANGE_TEMP_RULES';

//layout 7
export const ADD_DGDATA = 'ADD_DGDATA';
export const CHANGE_DGDATA = 'CHANGE_DGDATA';
export const DELETE_DGDATA = 'DELETE_DGDATA';

//layout 8
export const ADD_TNDATA = 'ADD_TNDATA';
export const CHANGE_TNDATA = 'CHANGE_TNDATA';
export const UPDATE_TNDATA  = 'UPDATE_TNDATA';
// layout 5
export const DELETE_DATA_LAYOUT_5 = 'DELETE_DATA_LAYOUT_5';
export const CHANGE_EDITSTATE_5 = 'CHANGE_EDITSTATE_5';
export const SAVE_DATA_LAYOUT_5 = 'SAVE_DATA_LAYOUT_5';
export const CHANGE_DATA = 'CHANGE_DATA';

export function addCDRData(newCDRData) {
    return {
        type: ADD_CDRDATA,
        data: newCDRData
    };
}

export function changeCDRData(newCDRData) {
    return {
        type: CHANGE_CDRDATA,
        data: newCDRData
    };
}

export function selectedCDRItem(newCDRItem) {
    return {
        type: SELECTED_CDRITEM,
        item: newCDRItem
    };
}

export function changeEditState(newEditState) {
    return {
        type: CHANGE_EDITSTATE,
        editstate: newEditState
    };
}

export function changeLevelData(newLevelData) {
    return {
        type: CHANGE_LEVEL_DATA,
        leveldata: newLevelData
    };
}

export function selectedVerb(newVerb) {
    return {
        type: SELECTED_VERB,
        verb: newVerb
    };
}

export function subjectList(newSubjectList) {
    return {
        type: SUBJECT_LIST,
        subjectlist: newSubjectList
    };
}

export function subjectId(newSubjectId) {
    return {
        type: SUBJECT_ID,
        subjectid: newSubjectId
    };
}

export function addItemKHGDTH(newItem){
    return{
        type: ADD_ITEM_KHGDTH,
        data: newItem,
    };
}
export function updateKHGDTH(newKHGDTH){
    return{
        type: UPDATE_KHGDTH,
        data: newKHGDTH,
    }
}
export function changeTempKHGDTH(newTemp){
    return{
        type: CHANGE_TEMP_KHGDTH,
        data: newTemp,
    }
}


export function addItemRule(newItem){
    return{
        type: ADD_ITEM_RULE,
        data: newItem,
    };
}
export function deleteItemRule(index){
    return{
        type: DELETE_ITEM_RULE,
        data: index,
    }
}
export function updateRules(newRules){
    return{
        type: UPDATE_RULES,
        data: newRules,
    }
}
export function changeTempRules(newTemp){
    return{
        type: CHANGE_TEMP_RULES,
        data: newTemp,
    }
}


export function addDGData(newDGData){
    return{
        type: ADD_DGDATA,
        data: newDGData
    };
}
export function changeDGData(newDGData){
    return{
        type: CHANGE_DGDATA,
        data: newDGData
    };
}

export function deleteDGData(newDGData){
    return{
        type: DELETE_DGDATA,
        data: newDGData
    };
}

export function addTNData(newTNData){
    return{
        type: ADD_TNDATA,
        data: newTNData
    };
}
export function changeTNData(newTNData){
    return {
        type: CHANGE_TNDATA,
        data: newTNData
    }
}
export function updateTNData(newTNData){
    return{
        type: UPDATE_TNDATA,
        data: newTNData
    }
}

export const MENUITEM = {
    THONG_TIN_CHUNG: 'thong-tin-chung',
    MO_TA_MON_HOC: 'mo-ta-mon-hoc',
    CHUAN_DAU_RA: 'chuan-dau-ra',
    DANH_GIA: 'danh-gia',
    GIANG_DAY_LY_THUYET: 'giang-day-ly-thuyet',
    GIANG_DAY_THUC_HANH: 'giang-day-thuc-hanh',
    MUC_TIEU_MON_HOC: 'muc-tieu-mon-hoc',
    QUY_DINH_CHUNG: 'quy-dinh-chung',
    TAI_NGUYEN_MON_HOC: 'tai-nguyen-mon-hoc',
    XUAT_FILE_PDF:'xuat-file',
    DE_CUONG_MON_HOC: 'de-cuong-mon-hoc',
    TAB_2: 'tab-2'
};