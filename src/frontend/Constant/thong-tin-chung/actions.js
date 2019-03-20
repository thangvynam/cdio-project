import * as Types from '../../Constant/thong-tin-chung/actionTypes';
import _ from 'lodash'
import axios from 'axios'

const collectDataRequest = () => {
    return (dispatch) => {
        return axios.get('/collect-data-1')
            .then(function (response) {
                const data = {
                    tenMonHocTV: response.data[0].ten_mon_hoc_tv,
                    tenMonHocTA: response.data[0].ten_mon_hoc_ta,
                    maMonHoc: response.data[0].ma_so,
                    khoiKienThuc: response.data[0].khoi_kien_thuc,
                    soTinChi: response.data[0].so_tin_chi,
                    tietLyThuyet: response.data[0].so_tiet_ly_thuyet,
                    tietThucHanh: response.data[0].so_tiet_thuc_hanh,
                    tietTuHoc: response.data[0].so_tiet_tu_hoc,
                    monTienQuyet: response.data[0].cac_mon_hoc_tien_quyet
                }
                dispatch(themThongTinChung(data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


const addDataTemp = (tempTTC) => {
    return {
        type: Types.ADD_TEMP_DATA,
        tempTTC: tempTTC
    }
}

const themThongTinChung = (newTTC) => {
    return {
        type: Types.ADD_TTC,
        newTTC
    }
}

const xoaThongTinChung = () => {
    return {
        type: Types.DELETE_TTC
    }
}

const suaThongTinChung = (newTTC) => {
    return {
        type: Types.EDIT_TTC,
        newTTC
    }
}

export {
    themThongTinChung,
    xoaThongTinChung,
    suaThongTinChung,
    addDataTemp,
    collectDataRequest
}