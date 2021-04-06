import React, { Component, useCallback, useContext, useLayoutEffect, useState } from "react";
import FieldContext from "./FieldContext";

export default function Field(props) {
  const { registerFieldEntity, getFieldValue, setFieldsValue } = useContext(FieldContext)
  const [_, forceUpdate] = useState()

  // 注册与注销
  useLayoutEffect(() => {
    return registerFieldEntity({
      props,
      onStoreChange: () => {
        forceUpdate({})
      }
    })
  }, [])

  const getControlled = useCallback(() => {
    const { name } = props;
    return {
      value: getFieldValue(name),
      onChange: e => {
        const newValue = e.target.value;
        setFieldsValue({ [name]: newValue });
      }
    };
  })
  const { children } = props;
  const returnChildNode = React.cloneElement(children, getControlled());
  return returnChildNode;
}

// ? 因为等下我要用某个api
// export default class Field extends Component {
//   static contextType = FieldContext;

//   componentDidMount() {
//     this.unregisterFieldEntity = this.context.registerFieldEntity(this);
//   }

//   componentWillUnmount() {
//     if (this.unregisterFieldEntity) {
//       this.unregisterFieldEntity();
//     }
//   }

//   onStoreChange = () => {
//     this.forceUpdate();
//   };

//   getControlled = () => {
//     const { getFieldValue, setFieldsValue } = this.context;
//     const { name } = this.props;
//     return {
//       value: getFieldValue(name), // todo get 从数据仓库取值
//       onChange: e => {
//         const newValue = e.target.value;
//         // todo set 修改数据仓库中的值
//         setFieldsValue({ [name]: newValue });
//       }
//     };
//   };
//   render() {
//     const { children } = this.props;
//     const returnChildNode = React.cloneElement(children, this.getControlled());
//     return returnChildNode;
//   }
// }
