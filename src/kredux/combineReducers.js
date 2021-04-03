/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-03-27 11:30:21
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-03-27 11:46:35
 */
export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextState = {};
    let hasChanged = false;
    for (let key in reducers) {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }
    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  }
};
