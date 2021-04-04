/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-04-02 10:33:17
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-04 19:01:30
 */
// import { connect } from 'react-redux'
// import { connect } from "../plugin/e-react-redux";
import { useDispatch, useSelector } from '../plugin/e-react-redux';
// import { useDispatch, useSelector } from 'react-redux';

function ReduxFnPage(props) {
  // const { num, add, minus, setSize } = props;
  const num = useSelector(state => state.count)
  const dispatch = useDispatch();
  const add = () => dispatch({ type: "ADD" })
  const minus = () => dispatch({ type: "MINUS" })
  return (
    <div>
      <h3>ReduxPage</h3>
      <p>counter: {num}</p>
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
      { props.children}
      {/* <div>useCallback set.size = {setSize}</div> */}
    </div>
  );
};

// 函数，类似mapgetters
const mapStateToProps = state => {
  return {
    num: state.count,
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

export default ReduxFnPage;

// export default connect(mapStateToProps, mapDispatchToProps)(ReduxFnPage);