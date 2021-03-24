/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-02-25 16:38:36
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-02-25 17:56:41
 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class RouterPage extends Component {
  render() {
    return (
      <div>
        <h3>RouterPage</h3>
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中⼼</Link>
          {/* 根路路由要添加exact，实现精确匹配 */}
          <Route
            exact
            path="/"
            component={HomePage}
          // children={() => <div>首页</div>}
          // render={() => <div>render</div>}
          />
          <Route path="/user" component={UserPage} />
          <Route path="/404" component={UserPage} />
        </Router>
      </div>
    );
  }
}

class HomePage extends Component {
  render() {
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    );
  }
}
class UserPage extends Component {
  render() {
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
export default RouterPage;