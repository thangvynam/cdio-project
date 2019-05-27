let baseUrl = window.env.REACT_APP_API_PREFIX;

export default{
    //subject
    COLLECT_SUBJECT_LIST: baseUrl + '/collect-subjectlist',


    //edit matrix
    UPDATE_STANDARD_MATRIX: baseUrl + '/update-standard-matrix',
    GET_STANDARD_MATRIX: baseUrl + '/get-standard-matrix',
    GET_REALITY_MATRIX: baseUrl + '/get-reality-matrix',

    //tab 4
    COLLECT_CDR_MDHD4: baseUrl + '/collect-cdrmdhd-4',
    GET_CDR_CDIO: baseUrl + '/get-cdr-cdio',
    COLLECT_MTMH: baseUrl + '/collect-mtmh',
    COLLECT_MTMH_HAS_CDR_CDIO: baseUrl + '/collect-mtmh-has-cdrcdio',
    COLLECT_MUCDO_MTMH_HAS_CDR_CDIO: baseUrl + '/collect-mucdo-mtmh-has-cdrcdio',
    COLLECT_DATA4: baseUrl + '/collect-data-4',
    SAVE_DATA4: baseUrl + '/save-data-4',
    GET_TEACHER_LIST: baseUrl + '/get-teacher-list',
}   