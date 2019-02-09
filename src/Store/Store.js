import treeMenuReducer from '../Reducers/TreeMenuReducer'
import rightLayoutReducer from '../Reducers/RightLayoutReducer'
import itemMenuReducer from '../Reducers/ItemMenuReducer'
var redux = require("redux");

const allReducers = redux.combineReducers({
    treeMenuReducer:treeMenuReducer,
    rightLayoutReducer:rightLayoutReducer,
    itemMenuReducer:itemMenuReducer

})
var store1 = redux.createStore(allReducers);
export default store1;