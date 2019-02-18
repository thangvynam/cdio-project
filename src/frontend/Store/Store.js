import itemMenuReducer from '../Reducers/ItemMenuReducer'
import itemLayout2Reducer from '../Reducers/ItemLayout2Reducer'
import itemLayout3Reducer from '../Reducers/ItemLayout3Reducer'
import addCDRDataReducer from '../Reducers/addCDRDataReducer';
import changeCDRDataReducer from '../Reducers/changeCDRDataReducer';
import itemKHGDTHReducer from '../Reducers/ItemKHGDTHReducer';
import selecteCDRItemReducer from '../Reducers/selectedCDRItem';
import changeEditStateReducer from '../Reducers/changeEditStateReducer';
import addDGDataReducer from '../Reducers/addDGDataReducer';
import changeDGDataReducer from '../Reducers/changeDGDataReducer';

var redux = require("redux");

const allReducers = redux.combineReducers({
    itemMenuReducer: itemMenuReducer,
    cdrtable: addCDRDataReducer,
    cdrdata: changeCDRDataReducer,
    cdrselecteditem: selecteCDRItemReducer,
    cdreditstate: changeEditStateReducer,
    itemLayout2Reducer: itemLayout2Reducer,
    itemLayout3Reducer: itemLayout3Reducer,
    itemKHGDTHReducer:itemKHGDTHReducer,
    dgtable : addDGDataReducer,
    dgdata: changeDGDataReducer,
})
var store1 = redux.createStore(allReducers);
export default store1;