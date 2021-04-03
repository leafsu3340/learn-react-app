import React, { Component } from "react";
import store from "../store/";
// import { connect } from 'react-redux'
// import store from "./store/ReduxStore";
import { connect } from "../plugin/e-react-redux";

class ReduxPage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   counter: 0
    // }
  }
  componentDidMount() {
    // store发生变化之后，执行subscribe的监听函数
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    // 修改状态 set
    store.dispatch({ type: "ADD" });
  };

  asyAdd = () => {
    // 修改状态 set
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "ADD" });
      }, 1000);
    });
  };

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        // type: "MINUS",
        type: "ADD",
        payload: 100,
      })
    );
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promiseMinus</button>
      </div>
    );
  }
}
// 函数，类似mapgetters
const mapStateToProps = state => {
  return {
    num: state,
  };
};
// 对象，类似mapactions
const mapDispatchToProps = {
  add: () => {
    return { type: "ADD" };
  },
  minus: () => {
    return { type: "MINUS" };
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ReduxPage);
