import React, { Component } from 'react'
import { actions } from 'mirrorx';
import Header from 'components/Header'
import BoardForm from '../board-form/BoardForm'
import BoardTable from '../board-table/BoardTable'

import './index.less'

export default class Board extends Component {
    constructor(props){
        super(props)
    }

    handleClick = (e) => {
        let data = actions.dashboard.getInfoData();
        console.log(data)
    }
    
    render(){
        
        return (
            <div>
                <Header title="我的工作面板" back={true} />
                <BoardForm />
                <BoardTable />
                <div className="work" onClick={this.handleClick} > 点击获取接口数据 </div>
            </div>
        )
    }
}