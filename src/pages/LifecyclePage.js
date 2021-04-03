/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-02-25 15:08:59
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-02-25 15:41:08
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
/*
V17可能会废弃的三个⽣生命周期函数⽤用getDerivedStateFromProps替代，⽬目前使⽤用的话加上
UNSAFE_：
- componentWillMount
- componentWillReceiveProps
- componentWillUpdate
*/
export default class LifeCyclePage extends Component {
  static defaultProps = {
    msg: "omg"
  };
  static propTypes = {
    msg: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log("constructor", this.state.count);
  }
  static getDerivedStateFromProps(props, state) {
    // getDerivedStateFromProps 会在调⽤用 render ⽅方法之前调⽤用，
    //并且在初始挂载及后续更更新时都会被调⽤用。
    //它应返回⼀一个对象来更更新 state，如果返回 null 则不不更更新任何内容。
    const { count } = state;
    console.log("getDerivedStateFromProps", count);
    return count < 5 ? null : { count: 0 };
  }
  //在render之后，在componentDidUpdate之前。
  getSnapshotBeforeUpdate(prevProps, prevState, snapshot) {
    const { count } = prevState;
    console.log("getSnapshotBeforeUpdate", count);
    return null;
  }
  /* UNSAFE_componentWillMount() {
    //不不推荐，将会被废弃
    console.log("componentWillMount", this.state.count);
  }
  */
  componentDidMount() {
    console.log("componentDidMount", this.state.count);
  }
  componentWillUnmount() {
    //组件卸载之前
    console.log("componentWillUnmount", this.state.count);
  }
  /*
  UNSAFE_componentWillUpdate() {
    //不不推荐，将会被废弃
    console.log("componentWillUpdate", this.state.count);
  }
  */
  componentDidUpdate() {
    console.log("componentDidUpdate", this.state.count);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { count } = nextState;
    console.log("shouldComponentUpdate", count, nextState.count);
    return count !== 3;
  }
  setCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    const { count } = this.state;
    console.log("render", this.state);
    return (
      <div>
        <h1>我是LifeCycle⻚页⾯面</h1>
        <p>{count}</p>
        <button onClick={this.setCount}>改变count</button>
        {/* {!!(count % 2) && <Foo />} */}
        <Child count={count} />
      </div>
    );
  }
}
class Child extends Component {
  /* UNSAFE_componentWillReceiveProps(nextProps) {
    //不不推荐，将会被废弃
    // UNSAFE_componentWillReceiveProps() 会在已挂载的组件接收新的 props 之前被调⽤用
    console.log("Foo componentWillReceiveProps");
  } */
  // static getDerivedStateFromProps(props, state) {
  //   console.log(props)
  //   console.log("child_getDerivedStateFromProps");
  //   return null;
  // }
  componentWillUnmount() {
    //组件卸载之前
    console.log(" Foo componentWillUnmount");
  }
  render() {
    return (
      <div
        style={{ border: "solid 1px black", margin: "10px", padding: "10px" }}
      >
        我是Foo组件
        <div>Foo count: {this.props.count}</div>
      </div>
    );
  }
}
