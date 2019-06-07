let baseUrl = window.env.REACT_APP_API_PREFIX;

export default{


    //edit matrix
    UPDATE_STANDARD_MATRIX: baseUrl + '/update-standard-matrix',

    //tab 1
    COLLECT_DATA1: baseUrl + '/collect-data',
    UPDATE_DATA1: baseUrl + '/update-data',
    //tab 4
    COLLECT_CDR_MDHD4: baseUrl + '/collect-cdrmdhd-4',
    COLLECT_MTMH: baseUrl + '/collect-mtmh',
    COLLECT_MTMH_HAS_CDR_CDIO: baseUrl + '/collect-mtmh-has-cdrcdio',
    COLLECT_MUCDO_MTMH_HAS_CDR_CDIO: baseUrl + '/collect-mucdo-mtmh-has-cdrcdio',
    COLLECT_DATA4: baseUrl + '/collect-data-4',
    AUTHEN_ME: baseUrl + '/authen-me',
    SAVE_DATA4: baseUrl + '/save-data-4',
    GET_TEACHER_LIST: baseUrl + '/get-teacher-list',
    GET_TEACHER_LIST_REVIEW: baseUrl + '/get-teacher-list-review',
    DELETE_TEACHER_REVIEW: baseUrl + '/delete-teacher-review',
    ADD_TEACHER_REVIEW: baseUrl + '/add-teacher-review',
    GET_TEACHER_SUBJECT: baseUrl + '/get-teacher-subject',
    GET_TEACHER_REVIEW_SUBJECT: baseUrl + '/get-teacher-review-subject',
    //Subject
    COLLECT_SUBJECT_LIST: baseUrl + '/collect-subjectlist',
    GET_BLOCK_SUBJECT: baseUrl + '/eduprogcontent/getBlockSubjects?id=',
    //Matrix
    GET_BENCHMARK_MATRIX: baseUrl + '/get-benchmark-matrix',
    GET_STANDARD_MATRIX: baseUrl + '/get-standard-matrix',
    GET_REALITY_MATRIX: baseUrl + '/get-reality-matrix',
    GET_MATRIX_SURVEY: baseUrl + '/get-matrix-survey',
    //CDR
    GET_CDR_CDIO: baseUrl + '/get-cdr-cdio',
    GET_CDR_3: baseUrl + '/get-cdr-3',
    GET_DATA_2: baseUrl + '/get-data-2',
    POST_DATA_2: baseUrl + '/save-data-2',
    POST_DATA_3: baseUrl + '/save-data-3',
    ADD_SURVEY_MATRIX: baseUrl + '/add-to-edit-matrix',
    SAVE_SURVEY_QA: baseUrl + '/save-survey-qa',
    SAVE_SURVEY: baseUrl + '/add-data-survey',
    EXPORT_FILE: baseUrl + '/exportfile',
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
    ADD_HDD : baseUrl + '/add-hdd',
    GET_HDD: baseUrl + '/get-danhmuc-hdd',
    UPDATE_HDD : baseUrl + '/update-hdd',
    DELETE_HDD : baseUrl + '/delete-hdd',

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
    GET_SURVEY_ITU: baseUrl + '/get-survey-itu',
    GET_DATA_SURVEY: baseUrl + '/get-data-survey',
    ADD_TO_EDIT_MATRIX : baseUrl + '/add-to-edit-matrix',
    ADD_DATA_SURVEY : baseUrl + '/add-data-survey',
    GET_SUBJECT_TEACHER : baseUrl + '/get-teacher-with-subject',
    ADD_SURVEY_DATA : baseUrl + '/add-survey-data',
    GET_ALL_DATA_SURVEY : baseUrl + '/get-all-data-survey',
    GET_SURVEY_ID : baseUrl + '/get-survey-id',
    GET_SURVEY_CTDT_TIME : baseUrl + '/get-survey-ctdt-time',
    ADD_SURVEY_LIST : baseUrl + '/add-survey-list',
    GET_SURVEY_CTDT_TIME2 : baseUrl + '/get-survey-ctdt-time2',
    SET_STATUS: baseUrl + '/set-status',
    GET_SURVEY_LIST : baseUrl + '/get-survey-list',
    GET_SURVEY_ID_SURVEYLIST : baseUrl + '/get-survey-with-id-survey-list',
    GET_SUBJECT_WITH_ID : baseUrl + '/get-subject-with-id',
    GET_LIST_SURVEY : baseUrl + '/get-list-survey',

    //tab 69
    ADD_DATA_6:baseUrl + '/add-data-6',
    ADD_DATA_9:baseUrl + '/add-data-9',

    //tab 7,8
    SAVE_DATA_8 : baseUrl + '/save-tainguyenmonhoc',
    SAVE_DATA_7 : baseUrl + '/save-danhgia',
    GET_CDR_DANHGIA : baseUrl + '/get-cdrdanhgia',
    GET_CDR_7 : baseUrl + '/get-cdr-7',

    //log
    SAVE_LOG:baseUrl + '/save-log',
    GET_LOG : baseUrl + '/get-log',

    GET_EVAL_ACTS_5 : baseUrl + '/get-evalact-5',
    GET_STANDARD_OUTPUT_5 : baseUrl + '/get-standard-output-5',
    COLLECT_DATA5 : baseUrl + '/collect-data-5',

    
    ADD_COMMENT2 : baseUrl + '/add-comment-2',
    SAVE_DATA_2 : baseUrl + '/save-data-2',
    SAVE_DATA_3 : baseUrl + '/save-data-3',

    ADD_DATA_5 : baseUrl + '/add-data-5',

    CHECK_STATUS: baseUrl + '/checkstatus',
    CHECK_DATE: baseUrl + '/checkdate',

    
    INSERT_STANDARD_MATRIX:baseUrl + '/insert-standard-matrix',
    
    GET_IDQA: baseUrl + '/getidqa',

}

