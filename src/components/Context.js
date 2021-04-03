/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-03-24 09:57:52
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-03-24 11:03:25
 */
import React from 'react';
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const MyContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => { }
});
