/*
 * @Description: first comp
 * @Author: dengxiaodong
 * @Date: 2021-02-25 11:40:32
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-02-25 14:42:42
 */
import React, { Component } from 'react';

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      counter: 0
    };
  }

  changeValue = v => {
    // this.setState(state => ({
    //   counter: state.counter + v
    // }), () => {
    //   console.log('最新 Counter', this.state.counter)
    // });
    this.setState({
      counter: this.state.counter + v
    }, () => {
      console.log('最新 Counter', this.state.counter)
    });
    console.log("改变 counter", this.state.counter);
  };

  setCounter = () => {
    this.changeValue(1);
    setTimeout(() => {
      this.changeValue(2);
    }, 2000)
    
    console.log("setCounter", this.state.counter);
    };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { date, counter } = this.state;
    return (
      <div>
        Time is {date.toLocaleTimeString()}
        <p>counter is {counter}</p>
        <button onClick={this.setCounter}>加1</button>
      </div>
    );
  }
}

export default Comp;
