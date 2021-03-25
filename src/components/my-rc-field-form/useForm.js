import React from "react";
class FormStore {
  constructor() {
    this.store = {}; //存储state数据, 以key value形式存储
    this.fieldEntities = []; //  存储field实例
    this.callbacks = {}; // 存储回调
    this.fieldRules = {};
  }

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  // 注册和取消注册 订阅和取消订阅 一定要成对出现
  registerFieldEntity = (entity) => {
    //注册
    this.fieldEntities.push(entity);
    return () => {
      // 取消注册
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  registerFieldRules = (rules) => {
    this.fieldRules = { ...this.fieldRules, ...rules };
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return { ...this.store };
  };

  // set函数，newStore可以定义多个state
  setFieldsValue = (newStore) => {
    // 合并
    // step1: 数据更新
    this.store = {
      ...this.store,
      ...newStore,
    };
    // step2: 组件也要更新
    // 对应组件才需要更新，需要加筛选
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    let err = [];
    // todo 校验 作业
    for (const fieldName in this.store) {
      if (this.fieldRules[fieldName]) {
        const rules = this.fieldRules[fieldName];
        rules.forEach(rule => {
          if (rule.required && !this.store[fieldName]) {
            err.push(rule.message);
          }
        })
      }
    }
    return err;
  };

  submit = () => {
    const { onFinish, onFinishFailed } = this.callbacks;
    const err = this.validate();
    // 先校验this.store
    // 校验通过 执行onFinish
    // 校验失败 执行 onFinishFailed

    if (err.length === 0) {
      // 成功
      onFinish(this.getFieldsValue());
    } else {
      // 失败
      onFinishFailed(err, this.getFieldsValue());
    }
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntity: this.registerFieldEntity,
      registerFieldRules: this.registerFieldRules,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    };
  };
}

export default function useForm(form) {   // 自定义hook，要以use开头， 自定义hook内可以使用hook
  const formRef = React.useRef();  // ref 对象在组件的整个生命周期内保持不变
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}

// hook的使用
// 1.函数组件内可以使用hook
// 2.自定义hook内可以使用hook
// 3.hook要在函数顶层使用
// 4.hook实际上相当于抽象了生命周期，可以达到复用状态逻辑的功效
