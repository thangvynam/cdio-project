import * as Types from '../../Constant/thong-tin-chung/actionTypes';
import _ from 'lodash'
import axios from 'axios'

const collectDataRequest = (id) => {
    return (dispatch) => {
        return axios.get(`/collect-data/${id}`)
            .then(function (response) {
                const data = {
                    tenMonHocTV: response.data.ten_mon_hoc_tv,
                    tenMonHocTA: response.data.ten_mon_hoc_ta,
                    maMonHoc: response.data.ma_so,
                    khoiKienThuc: response.data.khoi_kien_thuc,
                    soTinChi: response.data.so_tin_chi,
                    tietLyThuyet: response.data.so_tiet_ly_thuyet,
                    tietThucHanh: response.data.so_tiet_thuc_hanh,
                    tietTuHoc: response.data.so_tiet_tu_hoc,
                    monTienQuyet: response.data.cac_mon_hoc_tien_quyet
                }
                dispatch(fetchData(data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

const fetchData = (newTTC) => {
    return {
        type: Types.FETCH_DATA,
        newTTC
    }
}

const updateTTCRequest = (id, data) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: `/update-data/${id}`,
            data
        }).then(function (response) {

        }).catch(function (error) {
            console.log(error);
        });
    }
}

export {
    collectDataRequest,
    fetchData,
    updateTTCRequest,
}