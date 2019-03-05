import * as Types from '../../Constant/thong-tin-chung/actionTypes';

// const actAddSuccess = () => {
//     return {
//         type: Types.HANDLE_SUCCESS,
//         messageSuccess: "Success!!!"
//     }
// }

// const actAddFail = () => {
//     return {
//         type: Types.HANDLE_FAIL,
//         messageSuccess: "Fail!!!"
//     }
// }

// const resetStore = () => {
//     return (dispatch) => {
//         dispatch({
//             type: Types.RESET_STORE,
//         });
//     }
// }

const themThongTinChung = (newTTC)=>{
    return {
        type: Types.ADD_TTC,
        newTTC
    }
}

const xoaThongTinChung = ()=>{
    return {
        type: Types.DELETE_TTC
    }
}

const suaThongTinChung = (newTTC)=>{
    return {
        type: Types.EDIT_TTC,
        newTTC
    }
}

export {
    themThongTinChung,
    xoaThongTinChung, 
    suaThongTinChung
}