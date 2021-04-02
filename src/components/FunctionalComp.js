/*
 * @Description: 函数组件，只返回vnode
 * @Author: dengxiaodong
 * @Date: 2021-02-25 13:57:33
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-02-25 17:54:00
 */
import React, { useState, useEffect } from 'react';

export function FunctionalComp(props) {
  
  const [date, setDate] = useState(new Date()); // hook只在函数组件中使用
  useEffect(() => {
    // effect会在每轮渲染结束后执行，执行后需要重新订阅
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer); // 返回清除函数，防止内存泄漏
  }, []) // 第二个函数，改变后才重新订阅

  const jsx = <div>this is jsx</div>
  return (
    <div>
      {jsx}
      this is functional component
      <p>{date.toLocaleTimeString()}</p>
    </div>
  )
}