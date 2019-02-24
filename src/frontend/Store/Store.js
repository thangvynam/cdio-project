import itemMenuReducer5 from '../Reducers/ItemMenu5Reducer'
import itemLayout2Reducer from '../Reducers/ItemLayout2Reducer'
import itemLayout3Reducer from '../Reducers/ItemLayout3Reducer'
import { addCDRDataReducer, changeCDRDataReducer, selecteCDRItemReducer, changeEditStateReducer, 
    selectedVerbReducer, changeLevelDataReducer, selectedTempVerbReducer } from '../Reducers/cdrReducer';
import itemKHGDTHReducer from '../Reducers/ItemKHGDTHReducer';
import itemRuleReducer from '../Reducers/ItemRuleReducer';
import addDGDataReducer from '../Reducers/addDGDataReducer';
import changeDGDataReducer from '../Reducers/changeDGDataReducer';
import addTNDataReducer from '../Reducers/addTNDataReducer';
import changeTNDataReducer from '../Reducers/changeTNDataReducer';

var redux = require("redux");

const allReducers = redux.combineReducers({
    itemMenuReducer5: itemMenuReducer5,
    cdrtable: addCDRDataReducer,
    cdrdata: changeCDRDataReducer,
    cdrselecteditem: selecteCDRItemReducer,
    cdreditstate: changeEditStateReducer,
    cdrleveldata: changeLevelDataReducer,
    cdrverb: selectedVerbReducer,
    cdrtempverb: selectedTempVerbReducer,
    itemLayout2Reducer: itemLayout2Reducer,
    itemLayout3Reducer: itemLayout3Reducer,
    itemKHGDTHReducer:itemKHGDTHReducer,
    itemRuleReducer:itemRuleReducer,   
    dgtable : addDGDataReducer,
    dgdata: changeDGDataReducer,
    tntable: addTNDataReducer,
    tndata: changeTNDataReducer,
})
var store1 = redux.createStore(allReducers);
export default store1;