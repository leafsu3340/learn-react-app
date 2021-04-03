/*
 * @Description: 函数组件，只返回vnode
 * @Author: dengxiaodong
 * @Date: 2021-02-25 13:57:33
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-02 15:21:04
 */
import React, { useState, useEffect } from 'react';

export function FunctionalComp(props) {
  
  const [date, setDate] = useState(new Date()); // TAG hook只在函数组件中使用
  useEffect(() => {
    // TAG effect会在每轮渲染结束后执行，执行后需要重新订阅
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer); // TAG 返回清除函数，防止内存泄漏,这部分会再componentWillUnmount时执行
  }, []) // TAG 第二个函数，改变后才重新订阅

  const jsx = <div>this is jsx</div>
  return (
    <div>
      {jsx}
      this is functional component
      <p>{date.toLocaleTimeString()}</p>
    </div>
  )
}