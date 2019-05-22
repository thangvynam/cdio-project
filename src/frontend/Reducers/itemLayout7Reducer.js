import {SAVE_LOG, ADD_DGDATA, CHANGE_DGDATA, CHUDE_DANHGIA,IS_LOADED_7,CDR_DANHGIA,SAVE_ALL_DATA_LAYOUT_7 } from '../Constant/ActionType';
import axios from 'axios';
const addDGDataState = {
    previewInfo: [],
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
    isLoaded : false,
    chuandaura : [],
    logData: [],
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
        case IS_LOADED_7: {
            return{
                ...state,
                isLoaded : action.data
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
        case SAVE_LOG: {
            if(action.muc_de_cuong === 'danh-gia'){
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
            }else{
                return {...state,}
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