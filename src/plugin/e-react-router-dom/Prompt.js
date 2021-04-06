/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-04-06 20:59:10
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-06 21:08:21
 */
import React from "react";
import LifeCycle from "./LifeCycle";
import RouterContext from "./RouterContext";

export default function Prompt({ message, when = false }) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        if (!when) {
          return null;
        }
        let method = context.history.block; // TAG 拦截history跳转

        return (
          <LifeCycle
            onMount={(self) => {  // TAG Lifecycle里通过call绑定lifeCycle里的this，避免this.release指向不一致
              self.release = method(message);
            }}
            onUnmount={(self) => {
              self.release(); // 释放
            }}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
