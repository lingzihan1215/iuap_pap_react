import React, { Component } from 'react'
import './index.less'
import List from '../list'
import { actions } from 'mirrorx'

import Header from 'components/Header'

// 构造函数+原型
// babel: ES6 -> ES5
class Load extends Component {
    constructor(props){
        super(props)
    }
    // arrow function
    // 箭头函数
    clickEvent = () => {
        console.log('外部传入的方法')
       
    }
    render(){
        console.log(this.props)
        let asyncData = actions.manage.getInfoData();

        return (
            <div>
                <Header title="我的工作台" back={true} />
                <List 
                    title="sanyapp"
                    name="list"
                    handleclick={this.clickEvent}
                 />
            </div>
        )
    }
}

export default Load