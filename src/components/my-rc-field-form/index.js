import React from "react";
import _Form from "./Form";
// import Field from "./Field";
import Field from "./FnField";
import useForm from "./useForm";

// * React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。ref作为函数组件的第二个参数
// React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。
const Form = React.forwardRef(_Form);
Form.Field = Field;
Form.useForm = useForm;

export { Field, useForm };
export default Form;
