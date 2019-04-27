import * as Types from '../../Constant/matrix/matrixActionType';
import _ from 'lodash';
import axios from 'axios';

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

export {
    getDataMatrix,
    getDataBenchMarkMatrix
}