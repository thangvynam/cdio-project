import treeMenuReducer from '../Reducers/TreeMenuReducer'
import rightLayoutReducer from '../Reducers/RightLayoutReducer'
var redux = require("redux");

const allReducers = redux.combineReducers({
    treeMenuReducer:treeMenuReducer,
    rightLayoutReducer:rightLayoutReducer

})
var store1 = redux.createStore(allReducers);
export default store1;