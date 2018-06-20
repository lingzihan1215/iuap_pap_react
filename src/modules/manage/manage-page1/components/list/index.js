
import React, { Component } from "react"
import PropTypes from 'prop-types'

import './index.less'

// 构造函数+原型
// babel: ES6 -> ES5
class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLoading: true
        }
    }
    event = () => {
        // this.state.showLoading = false;

        this.setState({
            showLoading: false
        })
    }
    render(){
        let { name, title, handleclick } = this.props;
      
        return (
            <div className="manage-page" 
                onClick={this.event}>
                <h3 ref={ node => this.headerNode = node }> {title} </h3>
                <div className="demo">{ this.state.showLoading ? name : ""}</div>
            </div>
         
        )
    }
}

List.propType = {
    name: PropTypes.string.isRequired,
    title: PropTypes.object,
    handleclick: PropTypes.func
}

export default List



// 外部：props 输入
// 内部：state
// 输出：结果 
// 组件：状态机 