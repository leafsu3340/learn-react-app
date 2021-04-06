/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-04-06 15:59:58
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-06 20:31:19
 */
import React, { Component } from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          // TAG Context.Consumer的children需是个函数
          const { location } = context;
          const {
            children,
            component,
            render,
            path,
            computedMatch,
          } = this.props;

          const match = computedMatch
            ? computedMatch
            : path  // path为空时是404页面，此时采用祖传的match，祖传的 -> Router.computeRootMatch(this.state.location.pathname),
            ? matchPath(location.pathname, this.props)
            : context.match; //location.pathname === path;

          const props = { ...context, match };
          return (
            <RouterContext.Provider value={props}>
              {
                // TAG 嵌套路由，consumer匹配最近的provider
                // TAG 1.children：判断函数或其他；2.component:直接使用React.createElement 3.render：直接调用render函数
                match
                  ? children
                    ? typeof children === "function"
                      ? children()
                      : children
                    : component
                    ? React.createElement(component, props)
                    : render
                    ? render(props)
                    : null
                  : typeof children === "function"
                  ? children(this.props)
                  : null
              }
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
