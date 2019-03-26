import * as Types from '../Constant/thong-tin-chung/actionTypes';

const initialState = {
    previewInfo: [],
    tempData: [{
        tenMonHocTV: '',
        tenMonHocTA: '',
        maMonHoc: '',
        khoiKienThuc: '',
        soTinChi: -1,
        tietLyThuyet: -1,
        tietThucHanh: -1,
        tietTuHoc: -1,
        monTienQuyet: ''
    }]
};

export default function thongTinChung(state = initialState, action) {
    switch (action.type) {
        case Types.FETCH_DATA:
            return {
                ...state,
                previewInfo: action.newTTC
            }
        case Types.ADD_TTC:
            state.previewInfo = [];
            state.previewInfo.push(action.newTTC);
            return { ...state };
        case Types.ADD_TEMP_DATA:
            const key = Object.keys(action.tempTTC)[0];
            const value = Object.values(action.tempTTC)[0];
            state.tempData[0][key] = value;
            return { ...state };
        case Types.ADD_TEMP_DATA1:
            state.tempData = [];
            state.tempData.push(action.temp);
            return { ...state };
        case Types.DELETE_TTC:
            state.previewInfo = [];
            return { ...state };
        case Types.EDIT_TTC:
            state.previewInfo = [];
            state.previewInfo.push(action.newTTC);
            return { ...state };
        default:
            return { ...state };
    }
}