import * as Types from '../../Constant/matrix/matrixActionType';

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

const getNameGV = (newData) => {
    return {
        type : Types.GET_NAME_GV,
        newData
    }
}

export {
    getDataMatrix,
    getDataBenchMarkMatrix,
    getDataSurveyMatrix,
    getNameGV
}