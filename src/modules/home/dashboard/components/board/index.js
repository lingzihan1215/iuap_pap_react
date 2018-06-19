import React, { Component } from 'react'
import { actions } from 'mirrorx';

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
            <div onClick={this.handleClick} className="work"> 工作台 </div>
        )
    }
}