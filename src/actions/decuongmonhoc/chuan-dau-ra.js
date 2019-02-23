import * as Types from '../../constants/action-types/chuan-dau-ra';
import callApi from '../../utils/callApi';

const actThemChuanDauRa = (newData) => {
    console.log(newData);
    return {
        type: Types.ADD_CDRDATA,
        newData
    }
}

export {
    actThemChuanDauRa
}