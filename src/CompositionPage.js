/*
 * @Description: 复合组件-类似vue插槽
 * @Author: dengxiaodong
 * @Date: 2021-02-25 15:38:04
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-02-25 17:52:25
 */
import React, { Component } from 'react'
function Card(props) {
  console.log(props)
  return <div xu="card">
    {
      props.children
    }
  </div>
}
function Formbutton(props) {
  return <div className="Formbutton">
    <button onClick={props.children.defaultBtns.searchClick}>默认查询</button>
    <button onClick={props.children.defaultBtns.resetClick}>默认重置</button>
    {
      props.children.btns.map((item, index) => {
        return <button key={'btn' + index} onClick={item.onClick}>{item.title}
        </button>
      })
    }
  </div>
}
export default class CompositionPage extends Component {
  render() {
    return (
      <div>
        <Card>
          <p>我是内容</p>
        </Card>
        CompositionPage
        <Card>
          <p>我是内容2</p>
        </Card>
        <Formbutton>
          {{
            /* btns: (
            <>
            <button onClick={() => console.log('enn')}>查询</button>
            <button onClick={() => console.log('enn2')}>查询2</button>
            </>
            ) */
            defaultBtns: {
              searchClick: () => console.log('默认查询'),
              resetClick: () => console.log('默认重置')
            },
            btns: [
              {
                title: '查询',
                onClick: () => console.log('查询')
              }, {
                title: '重置',
                onClick: () => console.log('重置')
              }
            ]
          }}
        </Formbutton>
      </div>
    )
  }
}
