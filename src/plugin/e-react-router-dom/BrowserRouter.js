/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-04-06 15:57:05
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-06 17:02:02
 */
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import Router from "./Router";

export default class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    // TAG 路由不同实现方式，此处为history实现方式
    this.history = createBrowserHistory();
  }
  render() {
    return (
      <Router children={this.props.children} history={this.history}></Router>
    );
  }
}
