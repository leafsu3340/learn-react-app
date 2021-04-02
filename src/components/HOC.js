/*
 * @Description: 高阶组件，参数为组件，返回一个新的组件
 * @Author: dengxiaodong
 * @Date: 2021-03-25 09:47:21
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-02 15:27:49
 */
import React, { Component } from "react";

// export const foo = (Comp) => (props) => {
//   return (
//     <div className="border">
//       This is Hoc component
//       <Comp {...props} />
//     </div>
//   );
// };

export const foo = (Comp) => {
  return class InputHoc extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      return (
        <div style={{border: '1px solid red',padding: '10px'}}>
          this is Hoc secondtype 
          <Comp {...this.props}></Comp>
        </div>
      );
    }
  };
};
