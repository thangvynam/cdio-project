import _ from '../Constant/api';
import $ from 'axios';
import ld from 'lodash';

const setStorage = (userObj) => {
    return new Promise((resolve, reject) => {
        let convertObj = JSON.stringify(userObj) || {};
        localStorage.setItem('user', convertObj)
        //$.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
        $.defaults.headers.common['authorization'] = !ld.isEmpty(convertObj) 
        ? "JWT " + JSON.parse(convertObj).token
        : "" ;
        const aa = !ld.isEmpty(convertObj) 
        ? "JWT " + JSON.parse(convertObj).token
        : "" ;
        console.log("Â", aa);
        resolve()
    })
}

//subject
const collectSubjectList = () => {
    let url = _.GET_BLOCK_SUBJECT;
    return $.get(url);
}

const getBlockSubject = (id) => {
    let url = _.GET_BLOCK_SUBJECT;
    //$.headers["username"] = JSON.parse(localStorage.getItem('user')).data.Username;
    //$.headers["role"]= JSON.parse(localStorage.getItem('user')).data.Role;

    let header = {
        username: JSON.parse(localStorage.getItem('user')).data.Username,
        role: JSON.parse(localStorage.getItem('user')).data.Role
    }

    return $.get(url + id,header);
}

//edit matrix
const updateStandardMatrix = (data) => {
    let url = _.UPDATE_STANDARD_MATRIX;
    return $.post(url, data);
}

//Matrix
const getBenchmarkMatrix = (data) => {
    let url = _.GET_BENCHMARK_MATRIX;
    return $.post(url, data);

}

const getStandardMatrix = (data) => {
    let url = _.GET_STANDARD_MATRIX;
    return $.post(url, data);
}

const getRealityMatrix = (data) => {
    let url = _.GET_REALITY_MATRIX;
    return $.post(url, data);
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

const authenMe = (data) => {
    let url = _.AUTHEN_ME;
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

const getTeacherSubject = (data) => {
    let url = _.GET_TEACHER_SUBJECT;
    return $.post(url, data);
}

const getTeacherReviewSubject = (data) => {
    let url = _.GET_TEACHER_REVIEW_SUBJECT;
    return $.post(url, data);
}
//
const getCDR_CDIO = (data) => {
    let url = _.GET_CDR_CDIO;
    return $.get(url + data);
}

const getMatrixSurvey = (data) => {
    let url = `${_.GET_MATRIX_SURVEY}`;
    return $.post(url, data);
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

const getCDR_3 = (idCtdt) => {
    let url = `${_.GET_CDR_3}/${idCtdt}`;
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

const postData2 = (data, id) => {
    let url = _.POST_DATA_2;
    return $.post(url, { data: data, id: id })
}

const postData3 = (data, id) => {
    let url = _.POST_DATA_3;
    return $.post(url, { data: data, id: id })
}

const addSurveyMatrix = (data, idCtdt) => {
    let url = _.ADD_SURVEY_MATRIX;
    return $.post(url, {data, idCtdt})
}

const exportFile = (data) => {
    let url = _.EXPORT_FILE;
    return $.post(url, {data})
}

const saveSurveyQA = (data) => {
    let url = _.SAVE_SURVEY_QA;
    return $.post(url, {data})
}

const saveSurvey = (dataConvert, id_survey) => {
    let url = _.SAVE_SURVEY;
    return $.post(url, {
        data: dataConvert,
        id_survey,})
}

const getSubjectName = (id) => {
    let url = _.GET_SUBJECT_NAME;
    return $.post(url, {id})
}

const checkStatus = (data) => {
    let url = `${_.CHECK_STATUS}/${data}`;
    return $.get(url)
}

const checkDate = (data) => {
    let url = `${_.CHECK_DATE}/${data}`;
    return $.get(url)
}

const getData3 = (data) => {
    let url = `${_.GET_DATA_3}`;
    return $.post(url, {data});
}

const getData6 = (param, param2) => {
    let url = `${_.GET_DATA_6}/${param}/${param2}`;
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

const getStandardOutput6 = (param, param2) => {
    let url = `${_.GET_STANDARD_OUTPUT_6}/${param}/${param2}`;
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

const getSurvey = (data) => {
    let url = `${_.GET_SURVEY}`;
    return $.post(url, {data});
}

const getSurveyITU = (data) => {
    let url = `${_.GET_SURVEY_ITU}`;
    return $.post(url, {data});
}

const getDataSurvey = (id_ctdt) => {
    let url = `${_.GET_DATA_SURVEY}/${id_ctdt}`;
    return $.get(url);
}

const setStatus = (data) => {
    let url = `${_.SET_STATUS}`    
    return $.post(url, {data});
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

const saveData8 = (data) => {
    let url = _.SAVE_DATA_8;
    return $.post(url,data);
}

const saveData7 = (data) => {
    let url = _.SAVE_DATA_7;
    return $.post(url,data);
}

const collectData1 = (param) => {
    let url = `${_.COLLECT_DATA1}/${param}`;
    return $.get(url);
} 

const updateData1 = (param, data) => {
    let url = `${_.UPDATE_DATA1}/${param}`;
    return $.post(url,data);
}

const addToEditMatrix = (data) => {
    let url = _.ADD_TO_EDIT_MATRIX;
    return $.post(url,data);
}

const addHDD = (data) => {
    let url = _.ADD_HDD;
    return $.post(url,data);
}

const getDanhmucHDD = () => {
    let url = _.GET_HDD;
    return $.get(url);
}

const updateDanhmucHDD = (data) => {
    let url = _.UPDATE_HDD;
    return $.post(url,data);
}

const deleteDanhmucHDD = (data) => {
    let url = _.DELETE_HDD;
    return $.post(url,data);
}

const getEvalActs5 = (data) => {
    let url = _.GET_EVAL_ACTS_5;
    return $.post(url,data);
}

const getStandardOutput5 = (data) => {
    let url =_.GET_STANDARD_OUTPUT_5;
    return $.post(url,data);
}

const collectData5 = (data, ctdt) => {
    let url = _.COLLECT_DATA5;
    return $.post(url,data,ctdt);
}

const getCDRDanhgia = (data) => {
    let url = _.GET_CDR_DANHGIA;
    return $.post(url,data);
}

const getCDR_7 = (data) => {
    let url = _.GET_CDR_7;
    return $.post(url,data);
}

const getLog = (data) => {
    let url = _.GET_LOG;
    return $.post(url,data);
}

const addComment = (data) => {
    let url = _.ADD_COMMENT;
    return $.post(url,data);
}

const saveData2 = (data) => {
    let url = _.SAVE_DATA_2;
    return $.post(url,data);
}

const saveData3 = (data) => {
    let url = _.SAVE_DATA_3;
    return $.post(url,data);
}

const addData5 = (data) => {
    let url = _.ADD_DATA_5;
    return $.post(url,data);
}

const addDataSurvey =(data) => {
    let url = _.ADD_DATA_SURVEY;
    return $.post(url,data);
}

const insertStandardMatrix =(data) => {
    let url = _.INSERT_STANDARD_MATRIX;
    return $.post(url,data);
}

const getSubjectTeacher = (param) => {
    let url =`${_.GET_SUBJECT_TEACHER}/${param}`;
    return $.get(url);
}

const addSurveyData = (data) => {
    let url = _.ADD_SURVEY_DATA;
    return $.post(url,data);
}

const getSurveyData = () =>{
    let url = _.GET_ALL_DATA_SURVEY;
    return $.get(url);
}

const getSurveyId = (data) =>{
    let url = _.GET_SURVEY_ID;
    return $.post(url,data);
}

const getSurveyCTDTTime = (data) =>{
    let url = _.GET_SURVEY_CTDT_TIME;
    return $.post(url,data);
}

const addSurveyList = (data) => {
    let url = _.ADD_SURVEY_LIST;
    return $.post(url,data);
}

const getSurveyCTDTTime2 = (data) =>{
    let url = _.GET_SURVEY_CTDT_TIME2;
    return $.post(url,data);
}

const getIDQA = (id) => {
    let url = `${_.GET_IDQA}/${id}`;
    return $.get(url);
}

const getSurveyList = () =>{
    let url = _.GET_SURVEY_LIST;
    return $.get(url);
}

const getSurveyWithIdSurveyList = (params) => {
    let url = `${_.GET_SURVEY_ID_SURVEYLIST}/${params}`;
    // let url = `${_.GET_DATA_2}/${param}`;
    return $.get(url);
}

const getSubjectWithId = (data) => {
    let url =_.GET_SUBJECT_WITH_ID;
    return $.post(url,data);
}

const getListSurvey = (data) => {
    let url = _.GET_LIST_SURVEY;
    return $.post(url,data);
}

const updateStatusSurvey = (data) => {
    let url = _.UPDATE_STATUS_SURVEY;
    return $.post(url,data);
}

export default{
    //localStorage
    setStorage,
    //subject
    collectSubjectList,
    getBlockSubject,

    //edit matrix
    updateStandardMatrix,

    //tab 1
    collectData1,
    updateData1,

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
    getTeacherSubject,
    getTeacherReviewSubject,

    getBenchmarkMatrix,
    getStandardMatrix,
    getRealityMatrix,
    getCDR_CDIO,
    getMatrixSurvey,
    getChuDe,
    getLoaiTaiNguyen,
    getData2,
    postData2,
    postData3,
    addSurveyMatrix,
    exportFile,
    saveSurvey,
    saveSurveyQA,
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
    setStatus,

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
    addHDD,
    getDanhmucHDD,
    updateDanhmucHDD,
    deleteDanhmucHDD,

    addData6,
    addData9,

    saveData7,
    saveData8,
    getCDRDanhgia,
    getCDR_7,

    saveLog,
    getLog,

    authenMe,
    

    //survey
    addToEditMatrix,
    saveSurveyQA,
    addDataSurvey,
    getSubjectTeacher,
    addSurveyData,
    getSurveyData,
    getSurveyId,
    getSurveyCTDTTime,
    addSurveyList,
    getSurveyCTDTTime2,
    getSurveyList,
    getSurveyWithIdSurveyList,
    updateStatusSurvey,

    //export file
    exportFile,

    getEvalActs5,
    getStandardOutput5,
    collectData5,

    addComment,
    saveData2,
    saveData3,
    addData5,

    checkDate,
    checkStatus,
    insertStandardMatrix,
    checkStatus,
    getIDQA,
    getSurveyITU,
    getSubjectWithId,
    getListSurvey,
    getSubjectName,
}