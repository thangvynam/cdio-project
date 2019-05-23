import { SAVE_SURVEY, CHANGE_VALUE_ITU_SURVEY, 
    CHANGE_VALUE_DESCRIPTION_SURVEY} from '../Constant/ActionType';

const surveyInitialState = {
    tenMH: '',
    nguoiDuocKS: '',
    nguoiKS: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    dataValueITU: new Map(),
    dataValueDescription : new Map()
}
const SurveyReducer = (state = surveyInitialState, action) => {

    switch (action.type) {
        case SAVE_SURVEY: {
            switch (action.key) {
                case "tenMH":
                    return {
                        ...state,
                        tenMH: action.data
                    }
                case "nguoiDuocKS":
                    return {
                        ...state,
                        nguoiDuocKS: action.data
                    }
                case "nguoiKS":
                    return {
                        ...state,
                        nguoiKS: action.data
                    }
                case "q1":
                    return {
                        ...state,
                        q1: action.data
                    }
                case "q2":
                    return {
                        ...state,
                        q2: action.data
                    }
                case "q3":
                    return {
                        ...state,
                        q3: action.data
                    }
                case "q4":
                    return {
                        ...state,
                        q4: action.data
                    }
                case "q5":
                    return {
                        ...state,
                        q5: action.data
                    }
                case "q6":
                    return {
                        ...state,
                        q6: action.data
                    }
                case "q7":
                    return {
                        ...state,
                        q7: action.data
                    }
                case "q8":
                    return {
                        ...state,
                        q8: action.data
                    }
                case "q9":
                    return {
                        ...state,
                        q9: action.data
                    }
                case "q10":
                    return {
                        ...state,
                        q10: action.data
                    }
                case "q11":
                    return {
                        ...state,
                        q11: action.data
                    }
                default:
                    break;
            }

            return {
                ...state
            }
        }

        case CHANGE_VALUE_ITU_SURVEY: {
            return {
                ...state,
                dataValueITU : action.data
            }
        }

        case CHANGE_VALUE_DESCRIPTION_SURVEY: {
            return {
                ...state,
                dataValueDescription : action.data
            }
        }

        default:
            return state
    }
}
export default SurveyReducer;