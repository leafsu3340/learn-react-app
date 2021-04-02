/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-03-25 10:31:18
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-03-25 10:48:24
 */
import React, { Component } from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  getControlled() {
    const { setFieldsValue, getFieldValue } = this.context;
    const { name } = this.props;

    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldsValue({[name]: newValue})
      }
    }
  }

  render() {
    const {children} = this.props;
    const returnChildren = React.cloneElement(children, this.getControlled)
    return returnChildren;
  }
}

Field.contextType = FieldContext
