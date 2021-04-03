import { render } from "@testing-library/react";

/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-03-25 10:31:12
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-03-25 10:40:42
 */
import React from "react";
import FormStore from "./FormStore";
import FieldContext from "./FieldContext";

export default function Form({ children, onFinish, onFinishFailed }) {
  const [formInstance] = FormStore(form);

  render(
    <FieldContext.Provider value={formInstance}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formInstance.submit();
        }}
      ></form>
    </FieldContext.Provider>
  );
}
