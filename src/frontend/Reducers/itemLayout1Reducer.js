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
        default:
            return { ...state };
    }
}