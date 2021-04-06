/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-02-25 16:38:36
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-06 21:12:08
 */
import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Prompt,
} from "../plugin/e-react-router-dom";
import HomePage from "./HomePage";
import _404Page from "./_404Page";
import AboutPage from "./AboutPage";
class RouterPage extends Component {
  render() {
    return (
      <div>
        <h3>RouterPage</h3>
        <Router>
          <Link to="/">HomePage</Link>
          <Link to="/about">About</Link>
          <Link to="/user">用户中⼼</Link>
          <Link to="/product/123">商品</Link>
          {/* 根路路由要添加exact，实现精确匹配 */}
          <Switch>
            {" "}
            {/* 独占路由 */}
            <Route
              exact
              path="/"
              component={HomePage}
              // children={() => <div>首页</div>}
              // render={() => <div>render</div>}
            />
            <Route path="/about" component={AboutPage} />
            <Route path="/product/:id" render={() => <Product />} />
            <Route component={_404Page} />
          </Switch>
        </Router>
      </div>
    );
  }
}

@withRouter // TAG 高阶函数，返回一个包装好路由信息的组件，props中包含props
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { confirm: true };
  }
  change() {
    const { confirm } = this.state;
    this.setState({ confirm: !confirm });
  }
  render() {
    // TAG 函数组件中运用useRouteMatch自定义hook获取match信息
    const { match } = this.props;
    const { params, url } = match;
    const { id } = params;
    return (
      <div>
        <h1>Search-{id}</h1>
        <Link to={url + "/detail"}>详情</Link>
        <Link to="/">go home</Link>
        <button onClick={() => this.change()}>change</button>
        <Prompt
          when={this.state.confirm}
          // message="Are you sure you want to leave?"
          message={(location) => {
            return "Are you sure you want to leave-fun" + location;
          }}
        />
        <Route path={url + "/detail"} component={Detail} />
      </div>
    );
  }
}

function Detail(props) {
  console.log("detail", props); //sy-log
  return (
    <div>
      <h1>detail</h1>
    </div>
  );
}

export default RouterPage;
