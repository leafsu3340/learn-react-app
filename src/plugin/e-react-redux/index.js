/*
 * @Description: 实现一个React-Redux
 * @Author: dengxiaodong
 * @Date: 2021-04-02 10:46:41
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-03 22:48:18
 */
import React, { useCallback, useContext, useEffect, useState, useLayoutEffect } from 'react';

// TAG 定义全局context，类似全局状态库
const Context = React.createContext();
const set = new Set();

// TAG 1.provider
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>
};

// TAG 2.connect  类似mixins，vue中的store也是通过mixin方法混合进每个vue子组件
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (
  props
) => {
  // TAG useContext使用，参数为Context实例本身
  const store = useContext(Context);
  const { getState, dispatch, subscribe } = store;
  const stateProps = mapStateToProps(getState());
  let dispatchProps = { dispatch };
  if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  } else if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  }

  // TAG 3.store数据更新后，刷新组件，采用setState方法强制刷新
  const forceUpdate = useForceUpdate();

  // useLayoutEffect在DOM更新后同步执行，useEffect可以理解为异步执行，在完成渲染后的microTask中执行
  useLayoutEffect(() => {
    // subscribe返回一个取消订阅函数
    const unsubscribe = subscribe(() => {
      forceUpdate();
    })
    // 返回一个取消订阅函数，在componentWillUnMount中执行
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store])

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} setSize={set.size} />;
};



function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
export function bindActionCreators(creators, dispatch) {
  let obj = {};
  // todo
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

function useForceUpdate() {
  const [, setState] = useState(0);
  // TAG useCallback用法：返回的是个函数，缓存起来，组件刷新后该函数仍是同一个，避免不必要的重复创建
  // TAG useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

  // 以下这种方式写，每次组件更新都会得到一个新的函数，set.size会加1
  // const update = () => {
  //   setState((pre) => {
  //     return pre + 1
  //   });
  // }

  // 而使用了useCallback方法，set.size的值一直是1
  const update = useCallback(() => {
    setState((pre) => {
      return pre + 1
    });
  }, [])
  // TAG new Set()使用可以测试函数地址是否发生改变
  set.add(update);

  return update;
}

// TAG 实现自定义hook-useSelector
export function useSelector(select) {
  const store = useContext(Context);
  const { getState, subscribe } = store;

  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    })
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store])

  return select(getState())
}

// TAG 实现自定义hook-useDispatch
export function useDispatch() {
  const store = useContext(Context);
  const { dispatch } = store;
  return dispatch
}