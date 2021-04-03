// 手写一个createForm
import React, { Component } from "react";

export function createForm(Comp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }

    getFrom() {
      return {
        getFieldValue: this.getFieldValue,
        setFieldsValue: this.setFieldsValue,
        getFieldDecorator: this.getFieldDecorator,
        validateFields: this.validateFields
      };
    }

    getFieldValue = (fieldName) => {
      return this.state[fieldName] || "";
    };
    setFieldsValue = (store) => {
      this.setState(store);
    };
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };
    getFieldDecorator = (fieldName, options) => (InputComp) => {
      this.options[fieldName] = options;
      return React.cloneElement(InputComp, {
        name: fieldName,
        value: this.state[fieldName] || "",
        onChange: this.handleChange,
      });
    };
    validateFields = (callback) => {
      let err = [];
      for (const fieldName in this.options) {
        if (!this.state[fieldName]) {
          err.push(this.options[fieldName].msg)
        }
      }
      if (err.length === 0) {
        callback(null, {...this.state})
      } else {
        callback(err, {...this.state})
      }
    }
    render() {
      const form = this.getFrom();
      return <Comp {...this.props} form={form}></Comp>;
    }
  };
}
