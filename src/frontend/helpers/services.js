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


const collectSubjectList = () => {
    let url = _.COLLECT_SUBJECT_LIST;
    return $.get(url);
}

export default{
    collectSubjectList,
}