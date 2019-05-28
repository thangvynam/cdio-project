import _ from '../Constant/api';
import $ from 'axios';


// const setStorage = (userObj) => {
//     console.log(userObj)
//     return new Promise((resolve, reject) => {
//         localStorage.setItem('user', JSON.stringify(userObj))
//         $.defaults.headers.common['Authorization'] = " ";
//         resolve()
//     })
// }

//subject
const collectSubjectList = () => {
    let url = _.COLLECT_SUBJECT_LIST;
    return $.get(url);
}


//edit matrix
const updateStandardMatrix = (data) => {
    let url = _.UPDATE_STANDARD_MATRIX;
    return $.post(url, data);
}

//Matrix
const getBenchmarkMatrix = () => {
    let url = _.GET_BENCHMARK_MATRIX;
    return $.get(url);

}

const getStandardMatrix = () => {
    let url = _.GET_STANDARD_MATRIX;
    return $.get(url);
}

const getRealityMatrix = () => {
    let url = _.GET_REALITY_MATRIX;
    return $.get(url);
}


//tab 4
const collectCdrmdhd4 = () => {
    let url = _.COLLECT_CDR_MDHD4;
    return $.get(url);
}

const collectMtmh = (data) => {
    let url = _.COLLECT_MTMH;
    return $.post(url, data);
}

const collectMtmhHasCdrCdio = (data) => {
    let url = _.COLLECT_MTMH_HAS_CDR_CDIO;
    return $.post(url, data);
}

const collectMucdoMtmhHasCdrCdio = (data) => {
    let url = _.COLLECT_MUCDO_MTMH_HAS_CDR_CDIO;
    return $.post(url, data);
}

const collectData4 = (data) => {
    let url = _.COLLECT_DATA4;
    return $.post(url, data);
}

const saveData4 = (data) => {
    let url = _.SAVE_DATA4;
    return $.post(url, data);
}

const getTeacherList = (data) => {
    let url = _.GET_TEACHER_LIST;
    return $.post(url, data);
}

const getTeacherListReview = (data) => {
    let url = _.GET_TEACHER_LIST_REVIEW;
    return $.post(url, data);
}

const deleteTeacherReview = (data) => {
    let url = _.DELETE_TEACHER_REVIEW;
    return $.post(url, data);
}

const addTeacherReview = (data) => {
    let url = _.ADD_TEACHER_REVIEW;
    return $.post(url, data);
}

//
const getCDR_CDIO = () => {
    let url = _.GET_CDR_CDIO;
    return $.get(url);
}

const getMatrixSurvey = () => {
    let url = _.GET_MATRIX_SURVEY;
    return $.get(url);
}


const getChuDe = () => {
    let url = _.GET_CHUDE;
    return $.get(url);
}

const getComment = () => {
    let url = _.GET_COMMENT;
    return $.get(url);
}

const getLoaiTaiNguyen = () => {
    let url = _.GET_LOAITAINGUYEN;
    return $.get(url);
}

const getCDR_3 = () => {
    let url = _.GET_CDR_3;
    return $.get(url);
}

const getTeachingActs_5 = () => {
    let url = _.GET_TEACHINGACTS_5;
    return $.get(url);
}

const getTeachingActs_6 = () => {
    let url = _.GET_TEACHINGACTS_6;
    return $.get(url);
}

const getData2 = (param) => {
    let url = `${_.GET_DATA_2}/${param}`;
    return $.get(url);
}

const getData3 = (param) => {
    let url = `${_.GET_DATA_3}/${param}`;
    return $.get(url);
}

const getData6 = (param) => {
    let url = `${_.GET_DATA_6}/${param}`;
    return $.get(url);
}

const getData9 = (param) => {
    let url = `${_.GET_DATA_9}/${param}`;
    return $.get(url);
}

const getEvalActs6 = (param) => {
    let url = `${_.GET_EVAL_ACTS_6}/${param}`;
    return $.get(url);
}

const getStandardOutput6 = (param) => {
    let url = `${_.GET_STANDARD_OUTPUT_6}/${param}`;
    return $.get(url);
}

const getStandardOutput7 = (param) => {
    let url = `${_.GET_STANDARD_OUTPUT_7}/${param}`;
    return $.get(url);
}

const getDanhGia = (param) => {
    let url = `${_.GET_DANH_GIA}/${param}`;
    return $.get(url);
}

const getTaiNguyenMonHoc = (param) => {
    let url = `${_.GET_TAINGUYENMONHOC}/${param}`;
    return $.get(url);
}

const getSurveyQA = (param) => {
    let url = `${_.GET_SURVEYQA}/${param}`;
    return $.get(url);
}

const getSurvey = (param) => {
    let url = `${_.GET_SURVEY}/${param}`;
    return $.get(url);
}

const getDataSurvey = () => {
    let url = _.GET_DATA_SURVEY;
    return $.get(url);
}


//danhmuc
const updateCdrmdhd = (data) => {
    let url = _.UPDATE_CDRMDHD;
    return $.post(url, data);
}

const deleteCdrmdhdFromCdr = (data) => {
    let url = _.DELETE_CDRMDHD_FROM_CDR;
    return $.post(url, data);
}

const deleteCdrmdhd = (data) => {
    let url = _.DELETE_CDRMDHD;
    return $.post(url, data);
}

const addCdrmdhd = (data) => {
    let url = _.ADD_CDRMDHD;
    return $.post(url, data);
}

const updateChude = (data) => {
    let url = _.UPDATE_CHUDE;
    return $.post(url, data);
}

const deleteChudeFromDanhgia = (data) => {
    let url = _.DELETE_CHUDE_FROM_DANHGIA;
    return $.post(url, data);
}

const deleteDanhgia = (data) => {
    let url = _.DELETE_DANHGIA;
    return $.post(url, data);
}

const deleteChude = (data) => {
    let url = _.DELETE_CHUDE;
    return $.post(url, data);
}

const addChude = (data) => {
    let url = _.ADD_CHUDE;
    return $.post(url, data);
}

const updateLoaitainguyen = (data) => {
    let url = _.UPDATE_LOAITAINGUYEN;
    return $.post(url, data);
}

const deleteLoaitainguyenFromTainguyen = (data) => {
    let url = _.DELETE_LOAITAINGUYEN_FROM_TAINGUYEN;
    return $.post(url, data);
}

const deleteTainguyen = (data) => {
    let url = _.DELETE_TAINGUYEN;
    return $.post(url, data);
}

const deleteLoaitainguyen = (data) => {
    let url = _.DELETE_LOAITAINGUYEN;
    return $.post(url, data);
}

const addLoaitainguyen = (data) => {
    let url = _.ADD_LOAITAINGUYEN;
}

const addData6 = (data)=>{
    let url = _.ADD_DATA_6;
    return $.post(url, data);
}

const addData9 = (data)=>{
    let url = _.ADD_DATA_9;
    return $.post(url, data);
}

const saveLog = (data)=>{
    let url = _.SAVE_LOG;
    return $.post(url, data);
}

export default{
    //subject
    collectSubjectList,


    //edit matrix
    updateStandardMatrix,

    //tab 4
    collectCdrmdhd4,
    collectMtmh,
    collectMtmhHasCdrCdio,
    collectMucdoMtmhHasCdrCdio,
    collectData4,
    saveData4,
    getTeacherList,
    getTeacherListReview,
    deleteTeacherReview,
    addTeacherReview,
    
    getBenchmarkMatrix,
    getStandardMatrix,
    getRealityMatrix,
    getCDR_CDIO,
    getMatrixSurvey,
    getChuDe,
    getLoaiTaiNguyen,
    getData2,
    getCDR_3,
    getData3,
    getTeachingActs_5,
    getTeachingActs_6,
    getEvalActs6,
    getData6,
    getStandardOutput6,
    getStandardOutput7,
    getDanhGia,
    getTaiNguyenMonHoc,
    getData9,
    getComment,
    getSurveyQA,
    getSurvey,
    getDataSurvey,


    //danhmuc
    updateCdrmdhd,
    deleteCdrmdhdFromCdr,
    deleteCdrmdhd,
    addCdrmdhd,
    updateChude,
    deleteChudeFromDanhgia,
    deleteDanhgia,
    deleteChude,
    addChude,
    updateLoaitainguyen,
    deleteLoaitainguyenFromTainguyen,
    deleteTainguyen,
    deleteLoaitainguyen,
    addLoaitainguyen,

    addData6,
    saveLog,
    addData9,

}