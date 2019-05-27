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

const getCdrCdio = () => {
    let url = _.GET_CDR_CDIO;
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

const getTeacherList = () => {
    let url = _.GET_TEACHER_LIST;
    return $.get(url);
}

export default{
    //subject
    collectSubjectList,

    //edit matrix
    updateStandardMatrix,
    getStandardMatrix,
    getRealityMatrix,

    //tab 4
    collectCdrmdhd4,
    getCdrCdio,
    collectMtmh,
    collectMtmhHasCdrCdio,
    collectMucdoMtmhHasCdrCdio,
    collectData4,
    saveData4,
    getTeacherList,
}