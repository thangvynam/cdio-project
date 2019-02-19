export const ADD_DATA = 'ADD_DATA';
export const ADD_DATA_LAYOUT_2 = 'ADD_DATA_LAYOUT_2';
export const ADD_DATA_LAYOUT_3 = 'ADD_DATA_LAYOUT_3';
export const DELETE_DATA_LAYOUT_3 = 'DELETE_DATA_LAYOUT_3';
export const ADD_CDRDATA = 'ADD_CDRDATA';
export const CHANGE_CDRDATA = 'CHANGE_CDRDATA';
export const SELECTED_CDRITEM = 'SELECT_CDRITEM';
export const ADD_ITEM_KHGDTH = 'ADD_ITEM_KHGDTH';

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

export function AddItemKHGDTH(newItem){
    return{
        type: ADD_ITEM_KHGDTH,
        data: newItem,
    };
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
    TAI_NGUYEN_MON_HOC: 'tai-nguyen-mon-hoc'
};