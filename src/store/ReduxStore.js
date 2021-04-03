/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-02-25 16:02:08
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-02 14:13:46
 */
import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      console.log('ADD')
      return state + 1
    case 'MINUS':
      console.log('MINUS');
      return state - 1
    default:
      return state
  }
}
const store = createStore(counterReducer)

export default store;