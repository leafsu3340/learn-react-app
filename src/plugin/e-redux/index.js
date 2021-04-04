/*
 * @Description: 实现redux
 * @Author: dengxiaodong
 * @Date: 2021-02-25 16:02:08
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-04 19:02:51
 */
export const createStore = (reducer, enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState;
  let currentListeners = [];
  // get
  function getState() {
    return currentState;
  }
  // set
  function dispatch(action) {
    // TAG 中间件作用就类似于往此处添加加强逻辑，加强dispatch
    currentState = reducer(currentState, action);
    // state数据更新后促发监听(更新组件)
    currentListeners.forEach((listener) => listener());
    return action;
  }
  // 订阅及取消订阅
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }
  // 初始化加载初始值
  dispatch({ type: "REDUX?KKKKKKKKKKKKKKKK" });
  return {
    getState,
    dispatch,
    subscribe,
  };
};

export const combineReducers = (reducers) => {
  return function combination(state = {}, action) {
    let nextState = {};
    let hasChanged = false;
    for (let key in reducers) {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }
    hasChanged =
      hasChanged || Object.keys(nextState).length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
};

// TAG 中间件作用：加强dispatch
export const applyMiddleware = (...middlewares) => (createStore) => (
  reducer
) => {
  const store = createStore(reducer);
  const { getState } = store;
  let dispatch = store.dispatch;

  const midAPI = {
    getState: getState,
    dispatch: (action, ...args) => dispatch(action, ...args), // 加强dispatch，为能层层传递给套娃里的每一层
  };

  const chain = middlewares.map((middleware) => middleware(midAPI));
  dispatch = compose(...chain)(store.dispatch); // TAG compose作用下dispatch位于套娃最里层，最后会调用

  return {
    ...store,
    dispatch, // 返回加强版的dispatch
  };
};

// TAG 合成函数，链式调用
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args))); // TAG 函数聚合，最外层先执行
  // TAG 类似套娃，先剥开最外层，才能一层层看到里面的函数
  // TAG ...funcs循环聚合，顺序第一个函数位于套娃的最外层。
}
