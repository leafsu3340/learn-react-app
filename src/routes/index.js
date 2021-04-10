import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import _404Page from "../pages/_404Page";
import PrivateRoute from "./PrivateRoute";

export const routes = [
  {
    path: "/",
    exact: true, // 精确定位
    component: HomePage,
  },
  {
    path: "/user",
    component: UserPage,
    auth: PrivateRoute,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    component: _404Page,
  },
];

export default function Routes(props) {
  return (
    <Router>
      <Link to="/">首页</Link>
      <Link to="/user">用户中心</Link>
      <Link to="/login">登录</Link>

      <Switch>
        {routes.map((Route_, index) => {
          return Route_.auth ? (
            <Route_.auth key={Route_.auth + index} {...Route_} />
          ) : (
            <Route key={Route_.path + index} {...Route_} />
          );
        })}
      </Switch>
    </Router>
  );
}
