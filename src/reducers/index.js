import {combineReducers} from 'redux';

import thongTinChung from './decuongmonhoc/thong-tin-chung';
import chuanDauRa from './decuongmonhoc/chuan-dau-ra';


export default combineReducers({
    thongTinChung,
    chuanDauRa
})