/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-04-06 15:56:31
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-06 20:34:19
 */
import React, { Component } from 'react';
import RouterContext from './RouterContext';


export default class Router extends Component {
  static computeRootMatch(pathname) {// TAG Router给予一个默认的match Router
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };

    // history自带监听函数 - 监听location变化
    this.unlisten = props.history.listen((location) => {
      this.setState({ location });
    });
  }
  render() {
    const { children, history } = this.props;
    return (
      <RouterContext.Provider
        value={{
          history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}>
        {children}
      </RouterContext.Provider>
    );
  }
}
