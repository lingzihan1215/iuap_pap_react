import React, { Component } from 'react'
import moment from "moment/moment";
import { actions } from "mirrorx";
import ReactEcharts from 'echarts-for-react';
import '../macarons';//引入图标主题
import './index.less';

class Line extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentWillMount(){
        actions.echarts.getLineOption();
    }
    
    render(){
        const self=this;
        const { lineOption } = this.props;
        return (
            <div className="line">
                <ReactEcharts theme={"macarons"} option={lineOption} />
            </div>
        )
    }
}

export default Line;