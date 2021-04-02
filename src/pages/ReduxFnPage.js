/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-04-02 10:33:17
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-02 15:12:41
 */
// import { connect } from 'react-redux'
import { connect } from "../plugin/e-react-redux";

function ReduxFnPage(props) {
  const { num, add, minus, setSize } = props;
  return (
    <div>
      <h3>ReduxPage</h3>
      <p>counter: {num}</p>
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
      { props.children}
      <div>useCallback set.size = {setSize}</div>
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFnPage);