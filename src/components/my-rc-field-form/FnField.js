/*
 * @Description: 函数组件Field
 * @Author: dengxiaodong
 * @Date: 2021-04-02 15:31:29
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-06 13:13:16
 */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import FieldContext from "./FieldContext";

export default function FnField(props) {
  const { name, children, rules } = props;

  const context = useContext(FieldContext);

  const { registerFieldEntity, registerFieldRules } = context;

  const onStoreChange = () => {
    forceUpdate();
  };

  const field = useRef(null);
  // TAG useRef用途：返回的 ref 对象在组件的整个生命周期内保持不变
  // TAG useRef 类似于在 class 中使用实例字段的方式。
  // TAG useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。
  field.current = {
    props: props,
    onStoreChange: onStoreChange,
  };

  useEffect(() => {
    // TAG 如何获取Field实例？函数组件中没有this, 使用useRef
    const unregisterFieldEntity = registerFieldEntity(field);
    registerFieldRules({ [name]: rules });
    return () => {
      unregisterFieldEntity();
    };
  }, []);

  const forceUpdate = useForceUpdate();

  const getControlled = () => { // TAG 可以加上useCallback，优化性能
    const { getFieldValue, setFieldsValue } = context;

    return {
      value: getFieldValue(name), // get 从数据仓库取值
      onChange: (e) => {
        const newValue = e.target.value;
        // set 修改数据仓库中的值
        setFieldsValue({ [name]: newValue });
      },
    };
  };

  const returnChildNode = React.cloneElement(children, getControlled());
  return returnChildNode;
}

// TAG 函数组件强制组件刷新
function useForceUpdate() {
  const [, setState] = useState(0);
  const callback = useCallback(() => {
    setState((pre) => pre + 1);
  }, []);
  return callback;
}
