
import { UPDATE_CON_TAB, IS_LOAD_LOG, SHOW_INPUT_COMMENT,SAVE_LOG_DATA, SAVE_LOG_OBJECT } from "../Constant/ActionType";



const itemLayout2InitialState = {
    contentTab: '',
    isLoaded: false,
    idLog : -1,
    logData1: [],
    logData2: [],
    logData3: [],
    logData4: [],
    logData5: [],
    logData6: [],
    logData7: [],
    logData8: [],
    logData9: [],
}

const logReducer = (state = itemLayout2InitialState, action) => {
    switch (action.type) {
        case IS_LOAD_LOG: {            
            return {
                ...state,
                isLoaded: action.idLoaded
            }
        }
        case UPDATE_CON_TAB: {      
            return {
                ...state,
                contentTab: action.data
            }
        }
        case SHOW_INPUT_COMMENT:{
            return{
                ...state,
                idLog: action.id
            }
        }
        case SAVE_LOG_DATA: {
            switch (action.contentTab) {
                case "thong-tin-chung": {
                    return {
                        ...state,
                        logData1: action.data
                    }
                }
                case "mo-ta-mon-hoc": {
                    return {
                        ...state,
                        logData2: action.data
                    }
                }
                case "muc-tieu-mon-hoc": {
                    return {
                        ...state,
                        logData3: action.data
                    }
                }
                case "chuan-dau-ra": {
                    return {
                        ...state,
                        logData4: action.data
                    }
                }
                case "giang-day-ly-thuyet": {
                    return {
                        ...state,
                        logData5: action.data
                    }
                }
                case "giang-day-thuc-hanh": {
                    return {
                        ...state,
                        logData6: action.data
                    }
                }
                case "danh-gia": {
                    return {
                        ...state,
                        logData7: action.data
                    }
                }
                case "tai-nguyen-mon-hoc": {
                    return {
                        ...state,
                        logData8: action.data
                    }
                }
                case "quy-dinh-chung": {
                    return {
                        ...state,
                        logData9: action.data
                    }
                }
                default: 
                    return {
                    ...state,
                }
            }            
        }

        case SAVE_LOG_OBJECT: {            
            switch (action.muc_de_cuong) {
                case "thong-tin-chung": {
                    let data = {
                        nguoi_gui: action.ten,
                        thoi_gian: action.timestamp,
                        noi_dung: action.noi_dung,
                        muc_de_cuong: action.muc_de_cuong,
                        thong_tin_chung_id: action.thong_tin_chung_id
                    }
                    return {
                        ...state,
                        logData1: [...state, data]
                    }
                }
                case "mo-ta-mon-hoc": {
                    let data = {
                        nguoi_gui: action.ten,
                        thoi_gian: action.timestamp,
                        noi_dung: action.noi_dung,
                        muc_de_cuong: action.muc_de_cuong,
                        thong_tin_chung_id: action.thong_tin_chung_id
                    }
                    return {
                        ...state,
                        logData2: [...state.logData2, data]
                    }
                }
                case "muc-tieu-mon-hoc": {
                    let data = {
                        nguoi_gui: action.ten,
                        thoi_gian: action.timestamp,
                        noi_dung: action.noi_dung,
                        muc_de_cuong: action.muc_de_cuong,
                        thong_tin_chung_id: action.thong_tin_chung_id
                    }
                    return {
                        ...state,
                        logData3: [...state.logData3, data]
                    }
                }
                case "chuan-dau-ra": {
                    let data = {
                        nguoi_gui: action.ten,
                        thoi_gian: action.timestamp,
                        noi_dung: action.noi_dung,
                        muc_de_cuong: action.muc_de_cuong,
                        thong_tin_chung_id: action.thong_tin_chung_id
                    }
                    return {
                        ...state,
                        logData4: [...state.logData4, data]
                    }
                }
                case "giang-day-ly-thuyet": {
                    let data = {
                        nguoi_gui: action.ten,
                        thoi_gian: action.timestamp,
                        noi_dung: action.noi_dung,
                        muc_de_cuong: action.muc_de_cuong,
                        thong_tin_chung_id: action.thong_tin_chung_id
                    }
                    return {
                        ...state,
                        logData5: [...state.logData5, data]
                    }
                }
                case "giang-day-thuc-hanh": {
                    let data = {
                        nguoi_gui: action.ten,
                        thoi_gian: action.timestamp,
                        noi_dung: action.noi_dung,
                        muc_de_cuong: action.muc_de_cuong,
                        thong_tin_chung_id: action.thong_tin_chung_id
                    }
                    return {
                        ...state,
                        logData6: [...state.logData6, data]
                    }
                }
                case "danh-gia": {
                    let data = {
                        nguoi_gui: action.ten,
                        thoi_gian: action.timestamp,
                        noi_dung: action.noi_dung,
                        muc_de_cuong: action.muc_de_cuong,
                        thong_tin_chung_id: action.thong_tin_chung_id
                    }
                    return {
                        ...state,
                        logData7: [...state.logData7, data]
                    }
                }
                case "tai-nguyen-mon-hoc": {
                    let data = {
                        nguoi_gui: action.ten,
                        thoi_gian: action.timestamp,
                        noi_dung: action.noi_dung,
                        muc_de_cuong: action.muc_de_cuong,
                        thong_tin_chung_id: action.thong_tin_chung_id
                    }
                    return {
                        ...state,
                        logData8: [...state.logData8, data]
                    }
                }
                case "quy-dinh-chung": {
                    let data = {
                        nguoi_gui: action.ten,
                        thoi_gian: action.timestamp,
                        noi_dung: action.noi_dung,
                        muc_de_cuong: action.muc_de_cuong,
                        thong_tin_chung_id: action.thong_tin_chung_id
                    }
                    return {
                        ...state,
                        logData9: [...state.logData9, data]
                    }
                }
                default: 
                    return {
                    ...state,
                }
            }            
        }
        default:
            return state
    }
}
export default logReducer;