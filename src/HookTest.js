/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-02-25 17:35:00
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-02-25 17:49:11
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';

export default function HookTest (props) {
  const [counter, setCounter] = useState(0);

  const expresive = useMemo(() => {  // 返回的是一个值，直接{expresive}这样调用
    let totalNum = 0;
    for (let i = 0; i < counter; i++) {
      totalNum = totalNum + counter;
    }
    return totalNum;
  }, [counter])

  const expresiveCallback = useCallback(() => {  // 返回的是一个函数，callback()这样调用
    let totalNum = 0;
    for (let i = 0; i < counter; i++) {
      totalNum = totalNum + counter;
    }
    return totalNum;
  }, [counter])

  const add = () => {
    setCounter(counter + 1)
  }
  const print = () => {
    console.log('counter')
    console.log(counter)
  }
  useEffect(print, [counter])
  return (
    <div>
      <button onClick={add}>counter + 1</button>
      <button onClick={() => console.log(expresiveCallback())}>click expresive</button>
      <div>clock is {useClock().toLocaleTimeString()}</div>
      <div>total is {expresive}</div>
    </div>
  );
}


function useClock () {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    })
    return () => {
      clearInterval(timer);
    }
  }, [time])

  return time;
}
