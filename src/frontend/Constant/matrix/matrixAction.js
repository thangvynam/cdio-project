import * as Types from '../../Constant/matrix/matrixActionType';
import _ from 'lodash';
import axios from 'axios';

const getDataMatrix = (newData)=>{
    return {
        type: Types.GET_MATRIX,
        newData
    }
}

export {
    getDataMatrix,
}