import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

// 这里等下我想用hook
export default function Form({children, onFinish, onFinishFailed, form}, ref) {  // * 使用了React.forwardRef，因此这里有第二个参数ref
  const [formInstance] = useForm(form);

  React.useImperativeHandle(ref, () => formInstance);  // * 暴露formInstance给父组件，父组件的this.formRef等同于formIntance

  formInstance.setCallbacks({onFinish, onFinishFailed});

  return (
    <FieldContext.Provider value={formInstance}>
      <form
        onSubmit={e => {
          // 提交
          e.preventDefault();
          formInstance.submit();
        }}>
        {children}
      </form>
    </FieldContext.Provider>
  );
}
