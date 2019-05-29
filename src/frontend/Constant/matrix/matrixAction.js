import * as Types from '../../Constant/matrix/matrixActionType';
import _ from 'lodash';

const getDataMatrix = (newData)=>{
    return {
        type: Types.GET_MATRIX,
        newData
    }
}

const getDataBenchMarkMatrix = (newData)=>{
    return {
        type: Types.GET_BENCHMARK_MATRIX,
        newData
    }
}

const getDataSurveyMatrix = (newData)=>{
    return {
        type: Types.GET_SURVEY_MATRIX,
        newData
    }
}

export {
    getDataMatrix,
    getDataBenchMarkMatrix,
    getDataSurveyMatrix
}