import React, { Component } from "react";
import "./styles/App.css";
import styles from "./styles/index.module.css";
// import Comp from "./components/Comp";
// import { FunctionalComp } from "./components/FunctionalComp";
// import LifeCyclePage from "./pages/LifecyclePage";
// import CompositionPage from "./pages/CompositionPage";
// import ReduxPage from "./pages/ReduxPage";
// import ReduxFnPage from "./pages/ReduxFnPage";

import RouterPage from "./pages/RouterPage";
// import HookTest from "./components/HookTest";
// import { foo } from "./components/HOC";
// import HOCForm from './components/HOCForm';
// import MyRCFieldForm from './pages/MyRCFieldForm';



function App() {
  // 装饰器 
  // @foo
  // @foo
  // class Decorator extends Component {
  //   render() {
  //     return (
  //       <div style={{border: '1px solid red',padding: '10px'}}>this is decorator</div>
  //     );
  //   }
  // }
  // const Foo = foo(foo(HookTest));
  // const Input = foo(<input />)
  return (
    <div className={styles.app}>
      <header>
        <p>this is react</p>
      </header>
      {/* <HOCForm/>
      <Comp />
      <HookTest />
      <FunctionalComp />
      <LifeCyclePage />
      <CompositionPage />
      <RouterPage />
      <Foo />
      <Decorator/>
      <ReduxPage />
      <MyRCFieldForm/>
      <ReduxFnPage>
        <div>
          this is children
        </div>
      </ReduxFnPage>
       */}
       <RouterPage />
    </div>
  );
}

export default App;
