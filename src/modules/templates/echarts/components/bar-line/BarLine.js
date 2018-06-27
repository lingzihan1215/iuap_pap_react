import React, { Component } from 'react'
import moment from "moment/moment";
import { actions } from "mirrorx";
import ReactEcharts from 'echarts-for-react';
import '../macarons';//引入图标主题
import './index.less';

class BarLine extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentWillMount(){
        actions.echarts.getBarLineOption();
    }
    render(){
        let { barLineOption } = this.props;
        return (
            <div className="bar-line">
                <ReactEcharts theme={"macarons"} option={barLineOption} />
            </div>
        )
    }
}

export default BarLine;