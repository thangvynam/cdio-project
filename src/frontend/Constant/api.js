let baseUrl = window.env.REACT_APP_API_PREFIX;

export default{


    //edit matrix
    UPDATE_STANDARD_MATRIX: baseUrl + '/update-standard-matrix',

    //tab 4
    COLLECT_CDR_MDHD4: baseUrl + '/collect-cdrmdhd-4',
    COLLECT_MTMH: baseUrl + '/collect-mtmh',
    COLLECT_MTMH_HAS_CDR_CDIO: baseUrl + '/collect-mtmh-has-cdrcdio',
    COLLECT_MUCDO_MTMH_HAS_CDR_CDIO: baseUrl + '/collect-mucdo-mtmh-has-cdrcdio',
    COLLECT_DATA4: baseUrl + '/collect-data-4',
    SAVE_DATA4: baseUrl + '/save-data-4',
    GET_TEACHER_LIST: baseUrl + '/get-teacher-list',
    GET_TEACHER_LIST_REVIEW: baseUrl + '/get-teacher-list-review',
    DELETE_TEACHER_REVIEW: baseUrl + '/delete-teacher-review',
    ADD_TEACHER_REVIEW: baseUrl + '/add-teacher-review',

    //Subject
    COLLECT_SUBJECT_LIST: baseUrl + '/collect-subjectlist',
    //Matrix
    GET_BENCHMARK_MATRIX: baseUrl + '/get-benchmark-matrix',
    GET_STANDARD_MATRIX: baseUrl + '/get-standard-matrix',
    GET_REALITY_MATRIX: baseUrl + '/get-reality-matrix',
    GET_MATRIX_SURVEY: baseUrl + '/get-matrix-survey',
    //CDR
    GET_CDR_CDIO: baseUrl + '/get-cdr-cdio',
    GET_CDR_3: baseUrl + '/get-cdr-3',
    GET_DATA_2: baseUrl + '/get-data-2',
    GET_DATA_3: baseUrl + '/get-data-3',
    GET_DATA_6: baseUrl + '/get-data-6',
    GET_DATA_9: baseUrl + '/get-data-9',
    //Danh muc
    GET_CHUDE: baseUrl + '/get-chude',
    GET_LOAITAINGUYEN: baseUrl + '/get-loaitainguyen',
    
    UPDATE_CDRMDHD: baseUrl + '/update-cdrmdhd',
    DELETE_CDRMDHD_FROM_CDR: baseUrl + '/delete-cdrmdhd-from-cdr',
    DELETE_CDRMDHD: baseUrl + '/delete-cdrmdhd',
    ADD_CDRMDHD: baseUrl + '/add-cdrmdhd',
    UPDATE_CHUDE: baseUrl + '/update-chude',
    DELETE_CHUDE_FROM_DANHGIA: baseUrl + '/delete-chude-from-danhgia',
    DELETE_DANHGIA: baseUrl + '/delete-danhgia',
    DELETE_CHUDE: baseUrl + '/delete-chude',
    ADD_CHUDE: baseUrl + '/add-chude',
    UPDATE_LOAITAINGUYEN: baseUrl + '/update-loaitainguyen',
    DELETE_LOAITAINGUYEN_FROM_TAINGUYEN: baseUrl + '/delete-loaitainguyen-from-tainguyen',
    DELETE_TAINGUYEN: baseUrl + '/delete-tainguyen',
    DELETE_LOAITAINGUYEN: baseUrl + '/delete-loaitainguyen',
    ADD_LOAITAINGUYEN: baseUrl + '/add-loaitainguyen',
    //Layout
    GET_TEACHINGACTS_5: baseUrl + '/get-teachingacts-5',
    GET_TEACHINGACTS_6: baseUrl + '/get-teachingacts-6',
    GET_EVAL_ACTS_6: baseUrl + '/get-eval-acts-6',
    GET_STANDARD_OUTPUT_6: baseUrl + '/get-standard-output-6',
    GET_STANDARD_OUTPUT_7: baseUrl + '/get-standardoutput-7',
    GET_DANH_GIA: baseUrl + '/get-danhgia',
    GET_TAINGUYENMONHOC: baseUrl + '/get-tainguyenmonhoc',
    GET_COMMENT: baseUrl + '/get-comment',
    //Survey
    GET_SURVEYQA: baseUrl + '/get-surveyqa',
    GET_SURVEY: baseUrl + '/get-survey',
    GET_DATA_SURVEY: baseUrl + '/get-data-survey',



}

