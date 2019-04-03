import { ADD_DGDATA, CHANGE_DGDATA, CHUDE_DANHGIA,IS_LOADED_7_1,IS_LOADED_7_2,CDR_DANHGIA,SAVE_ALL_DATA_LAYOUT_7 } from '../Constant/ActionType';
import axios from 'axios';
const addDGDataState = {
    previewInfo: [],
        // [{
        //     key: 'BTTL',
        //     standardOutput: [],
        //     mathanhphan: 'BTTL',
        //     tenthanhphan: 'Bài tập tại lớp',
        //     mota: '',
        //     tile: '',
        // }, {
        //     key: 'BTTL#1',
        //     standardOutput: ['G1.3', 'G5.4', 'G6.1'],
        //     mathanhphan: '\xa0\xa0\xa0BTTL#1',
        //     tenthanhphan: 'Mô hình hóa phần mềm',
        //     mota: 'Mô hình hóa dựa trên yêu cầu đặt tả đã có sẵn',
        //     tile: '2.5%',
        // }, {
        //     key: 'BTTL#2',
        //     standardOutput: ['G5.4', 'G6.1'],
        //     mathanhphan: '\xa0\xa0\xa0BTTL#2',
        //     tenthanhphan: 'Thiết kế giao diện',
        //     mota: 'Thiết kế 1 màn hình tìm sản phẩm',
        //     tile: '2.5%',
        // }, {
        //     key: 'BTVN',
        //     standardOutput: [],
        //     mathanhphan: 'BTVN',
        //     tenthanhphan: 'Bài tập về nhà',
        //     mota: '',
        //     tile: '',
        // }, {
        //     key: 'BTVN#1',
        //     standardOutput: ['G1.3', 'G5.4', 'G6.1'],
        //     mathanhphan: '\xa0\xa0\xa0BTVN#1',
        //     tenthanhphan: 'Mô hình hóa phần mềm',
        //     mota: 'Mô hình hóa dựa trên yêu cầu đặt tả đã có sẵn',
        //     tile: '5%',
        // }, {
        //     key: 'BTVN#2',
        //     standardOutput: ['G5.4', 'G6.1'],
        //     mathanhphan: '\xa0\xa0\xa0BTVN#2',
        //     tenthanhphan: 'Thiết kế giao diện',
        //     mota: 'Thiết kế 1 màn hình tìm sản phẩm',
        //     tile: '2%',
        // }],
    tempInfo: {
        chude : [],
        mathanhphan: "",
        tenthanhphan: "",
        mota: "",
        tile:"",
        standardOutput: [],
        chuandaura : "",
    },
    chudeDanhGia : [],
    isLoaded1 : false,
    isLoaded2 : false,
    chuandaura : [],
};


export function itemLayout7Reducer(state = addDGDataState, action) {

    switch (action.type) {
        case ADD_DGDATA:{
            return{
                ...state,
                previewInfo : action.data,
            }
        }
        case CHUDE_DANHGIA:{
            return{
                ...state,
                chudeDanhGia : action.data,
            }
        }
        case IS_LOADED_7_1: {
            return{
                ...state,
                isLoaded1 : action.data
            }
        }
        case IS_LOADED_7_2: {
            return{
                ...state,
                isLoaded2 : action.data
            }
        }
        
        case CDR_DANHGIA:{
            return{
                ...state,
                chuandaura : action.data
            }
        }
        case SAVE_ALL_DATA_LAYOUT_7:{
            axios.post('/save-danhgia',{data: action.data})
            return {
                ...state,
            }
        }
        default:
            return state;
    }
}


const changeDGDataState = {
    standardOutput: '',
    mathanhphan: '',
    tenthanhphan: '',
    mota: '',
    tile: '',
};

export function changeDGDataReducer(state = changeDGDataState, action) {

    switch (action.type) {
        case CHANGE_DGDATA:
            return action.data;
        default:
            return state;
    }
}