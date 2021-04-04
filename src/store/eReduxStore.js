/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-02-25 16:02:08
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-04 18:55:49
 */
import { createStore, combineReducers, applyMiddleware } from "../plugin/e-redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";
import isPromise from "is-promise";


// TAG 1.reduce规则：定义current state + action
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      console.log("ADD");
      return state + 1;
    case "MINUS":
      console.log("MINUS");
      return state - 1;
    default:
      return state;
  }
};

// TAG 2.生成reduxStore，暴露getState、dispatch、subscribe接口
const store = createStore(
  combineReducers({ count: counterReducer }),
  applyMiddleware(thunk, promise, logger)
);

export default store;

// 解决异步
function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}
// logger 打印日志
function logger({ getState, dispatch }) {
  return (next) => (action) => {
    console.log("--------------------------"); //sy-log
    console.log(action.type + "执行了！"); //sy-log
    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);
    const nextState = getState();

    console.log("next state", nextState); //sy-log

    console.log("--------------------------"); //sy-log

    return returnValue;
  };
}
function promise({ getState, dispatch }) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
