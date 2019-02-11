import { ADD_CDRDATA, CHANGE_CDRDATA } from '../Constant/ActionType';

export function addCDRData(newCDRData) {
    return {
        type: ADD_CDRDATA,
        data: newCDRData
    };
}

export function changeCDRData(newCDRData) {
    return {
        type: CHANGE_CDRDATA,
        data: newCDRData
    };
}