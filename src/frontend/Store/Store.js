import itemLayout5Reducer from '../Reducers/ItemLayout5Reducer'
import itemLayout2Reducer from '../Reducers/ItemLayout2Reducer'
import itemLayout3Reducer from '../Reducers/ItemLayout3Reducer'
import { itemLayout4Reducer, changeCDRDataReducer, selecteCDRItemReducer, changeEditStateReducer, 
    selectedVerbReducer } from '../Reducers/cdrReducer';
import {itemLayout7Reducer,changeDGDataReducer} from '../Reducers/DGReducer';
import {itemLayout8Reducer,changeTNDataReducer} from '../Reducers/TNReducer';
import itemLayout6Reducer from "../Reducers/ItemLayout6Reducer";
import itemLayout9Reducer from "../Reducers/ItemLayout9Reducer";

var redux = require("redux");

const allReducers = redux.combineReducers({

    itemLayout5Reducer: itemLayout5Reducer,
    itemLayout2Reducer: itemLayout2Reducer,
    itemLayout3Reducer: itemLayout3Reducer,
    itemLayout4Reducer: itemLayout4Reducer,
    cdrdata: changeCDRDataReducer,
    cdrselecteditem: selecteCDRItemReducer,
    cdreditstate: changeEditStateReducer,
    cdrverb: selectedVerbReducer,
    itemLayout6Reducer: itemLayout6Reducer,
    itemLayout9Reducer: itemLayout9Reducer,
    itemLayout7Reducer : itemLayout7Reducer,
    dgdata: changeDGDataReducer,
    itemLayout8Reducer: itemLayout8Reducer,
    tndata: changeTNDataReducer,
});
var store1 = redux.createStore(allReducers);
export default store1;
