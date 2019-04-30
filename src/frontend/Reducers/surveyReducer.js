import {SAVE_SURVEY,CHANGE_VALUE_ITU_SURVEY} from '../Constant/ActionType';
import {SAVE_SURVEY} from '../Constant/ActionType';
import axios from 'axios';

const surveyInitialState = {
    survey: {},
    dataValueITU: new Map()
}
const SurveyReducer = (state = surveyInitialState, action) => {
    switch (action.type) {
        case SAVE_SURVEY: {
            axios.post('/save-survey-qa', { data: action.survey })
            return {
                ...state,
                survey: action.survey
            }
        }

        case CHANGE_VALUE_ITU_SURVEY: {
            return {
                ...state,
                dataValueITU : action.data
            }
        }
        default:
            return state
    }
}
export default SurveyReducer;