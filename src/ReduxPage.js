/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-02-25 16:01:04
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-02-25 16:36:32
 */
import React, { Component } from 'react';
// import store from "./store/ReduxStore";
import { connect } from 'react-redux'

class ReduxPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }
  componentDidMount() {
    // store.subscribe(() => {
    //   const counter = store.getState();
    //   console.log("subscribe");
    //   // this.forceUpdate();
    //   this.setState(() => ({ counter: counter }));
    // });
  }
  // add = () => {
  //   store.dispatch({ type: "ADD" });
  // };
  // minus = () => {
  //   store.dispatch({ type: "MINUS" });
  // };
  render() {
    // console.log("store", store);
    // const { counter } = this.state;
    const { num, add, minus } = this.props;
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>counter: {num}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
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