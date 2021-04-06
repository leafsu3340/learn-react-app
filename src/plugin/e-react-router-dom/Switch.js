/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-04-06 15:58:26
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-06 16:47:09
 */
import React, { Component } from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;

          let match; //标记匹配
          let element; //标记匹配的元素

          React.Children.forEach(this.props.children, (child) => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              match = child.props.path ? matchPath(location.pathname, child.props)
                : context.match;
            }
          })

          return match
            ? React.cloneElement(element, { computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}