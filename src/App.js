import logo from "./logo.svg";
import "./App.css";
import styles from "./index.module.css";
// import Comp from "./Comp";
// import { FunctionalComp } from "./FunctionalComp";
// import LifeCyclePage from "./LifecyclePage";
// import CompositionPage from "./CompositionPage";
// import ReduxPage from "./ReduxPage";
// import RouterPage from "./RouterPage";
// import HookTest from "./HookTest";
import { foo } from "./HOC";
import React, { Component } from "react";
import HOCForm from './HOCForm';
import MyRCFieldForm from './pages/MyRCFieldForm';



function App() {
  // 装饰器 
  @foo
  @foo
  class Decorator extends Component {
    render() {
      return (
        <div style={{border: '1px solid red',padding: '10px'}}>this is decorator</div>
      );
    }
  }
  // const Foo = foo(foo(HookTest));
  // const Input = foo(<input />)
  return (
    <div className={styles.app}>
      <header>
        <img src={logo} className={styles.icon} alt="logo" />
        <p>this is react</p>
      </header>
      <HOCForm/>
      {/* <Comp />
      <HookTest />
      <FunctionalComp />
      <LifeCyclePage />
      <CompositionPage />
      <ReduxPage />
      <RouterPage />
      <Foo /> */}
      <Decorator/>
      <MyRCFieldForm/>
    </div>
  );
}

export default App;
