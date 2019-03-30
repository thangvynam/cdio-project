export const ADD_DATA = 'ADD_DATA';
export const ADD_DATA_LAYOUT_2 = 'ADD_DATA_LAYOUT_2';
export const SAVE_DATA_LAYOUT_2 = 'SAVE_DATA_LAYOUT_2';
export const SAVE_TEMP_DATA_LAYOUT_2 = 'SAVE_TEMP_DATA_LAYOUT_2';
export const SAVE_ALL_DATA_LAYOUT_2 = 'SAVE_ALL_DATA_LAYOUT_2';
export const IS_LOADED_2 = 'IS_LOADED_2';
export const UPDATE_CON_TAB = 'UPDATE_CON_TAB';

export const SAVE_LOG = 'SAVE_LOG';
export const IS_LOAD_LOG = 'IS_LOAD_LOG';
export const SAVE_LOG_DATA= 'SAVE_LOG_DATA';

export const RESET_TAB = 'RESET_TAG';

//layout 3
export const ADD_DATA_LAYOUT_3 = 'ADD_DATA_LAYOUT_3';
export const DELETE_DATA_LAYOUT_3 = 'DELETE_DATA_LAYOUT_3';
export const SAVE_DATA_LAYOUT_3 = 'SAVE_DATA_LAYOUT_3';
export const SAVE_TEMP_DATA_LAYOUT_3 = 'SAVE_TEMP_DATA_LAYOUT_3';
export const SAVE_ALL_DATA_LAYOUT_3 = 'SAVE_ALL_DATA_LAYOUT_3';
export const IS_LOADED_3 = 'IS_LOADED_3';
export const ADD_ARRAY_LAYOUT_3 = 'ADD_ARRAY_LAYOUT_3';

// layout4
export const ADD_CDRDATA = 'ADD_CDRDATA';
export const CHANGE_CDRDATA = 'CHANGE_CDRDATA';
export const SELECTED_CDRITEM = 'SELECT_CDRITEM';
export const CHANGE_EDITSTATE = 'CHANGE_EDITSTATE';
export const CHANGE_LEVEL_DATA = 'CHANGE_LEVEL_DATA';
export const SELECTED_VERB = 'SELECTED_VERB';
export const SELECTED_TEMP_VERB = 'SELECTED_TEMP_VERB';
export const MENU_ITEM = 'MENU_ITEM';
export const SUBJECT_LIST = 'SUBJECT_LIST';
export const SUBJECT_ID = 'SUBJECT_ID';
export const SUBJECT_MASO = 'SUBJECT_MASO';
export const CDRMDHD_DB = 'CDRMDHD_DB';
export const CDRMDHD = 'CDRMDHD';
export const MTMH = 'MTMH';
export const ISLOAD = 'ISLOAD';
export const EDIT_MATRIX = 'EDIT_MATRIX';
export const EDIT_MATRIX_EDIT_STATE = 'EDIT_MATRIX_EDIT_STATE';
export const ISLOAD_EDIT_MATRIX = 'ISLOAD_EDIT_MATRIX';

//layout 6
export const ADD_ITEM_KHGDTH = 'ADD_ITEM_KHGDTH';
export const UPDATE_KHGDTH = 'UPDATE_KHGDTH';
export const CHANGE_TEMP_KHGDTH = 'CHANGE_TEMP_KHGDTH';
export const CHANGE_MAP_KHGDTH = 'CHANGE_MAP_KHGDTH';



//layout 9
export const ADD_ITEM_RULE = 'ADD_ITEM_RULE';
export const DELETE_ITEM_RULE = 'DELETE_ITEM_RULE';
export const UPDATE_RULES = 'UPDATE_RULES';
export const CHANGE_TEMP_RULES = 'CHANGE_TEMP_RULES';
export const CHANGE_ISLOADED_RULES = 'CHANGE_ISLOADED_RULES';

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
export const ADD_DATA_LAYOUT_5 = "ADD_DATA_LAYOUT_5";
export const COLLECT_DATA_REQUEST_5 = "COLLECT_DATA_REQUEST_5";

export function saveLog(ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id) {
    return {
        type: SAVE_LOG,
        ten: ten,
        timestamp: timestamp,
        noi_dung: noi_dung,
        muc_de_cuong: muc_de_cuong,
        thong_tin_chung_id: thong_tin_chung_id
    };
}

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

export function cdrmdhddb(newCdrmdhddb) {
    return {
        type: CDRMDHD_DB,
        cdrmdhddb: newCdrmdhddb
    };
}

export function cdrmdhd(newCdrmdhd) {
    return {
        type: CDRMDHD,
        cdrmdhd: newCdrmdhd
    };
}

export function mtmh(newMtmh) {
    return {
        type: MTMH,
        mtmh: newMtmh
    };
}

export function isLoad(newIsLoad) {
    return {
        type: ISLOAD,
        isload: newIsLoad
    };
}

export function menuItem(newMenuItem) {
    return {
        type: MENU_ITEM,
        menuitem: newMenuItem
    };
}

export function subjectId(newSubjectId) {
    return {
        type: SUBJECT_ID,
        subjectid: newSubjectId
    };
}

export function subjectMaso(newSubjectMaso) {
    return {
        type: SUBJECT_MASO,
        subjectmaso: newSubjectMaso
    };
}

export function subjectList(newSubjectList) {
    return {
        type: SUBJECT_LIST,
        subjectlist: newSubjectList
    };
}

export function editMatrix(newEditMatrix) {
    return {
        type: EDIT_MATRIX,
        editmatrix: newEditMatrix
    };
}

export function editMatrixEditState(newEditMatrixEditState) {
    return {
        type: EDIT_MATRIX_EDIT_STATE,
        editmatrixeditstate: newEditMatrixEditState
    };
}

export function isLoadEditMatrix(newIsLoadEditMatrix) {
    return {
        type: ISLOAD_EDIT_MATRIX,
        isloadeditmatrix: newIsLoadEditMatrix
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
export function changeMapKHGDTH(newMap){
    return{
        type: CHANGE_MAP_KHGDTH,
        data: newMap,
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
export function changeIsLoadedRules(newIsLoaded){
    return{
        type: CHANGE_ISLOADED_RULES,
        data: newIsLoaded,
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

export function updateContentTab(contentTab){
    return {
        type: UPDATE_CON_TAB,
        data: contentTab
    }
}
export function resetTab(){
    return {
        type: RESET_TAB,
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