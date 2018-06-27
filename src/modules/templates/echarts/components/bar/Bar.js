import React, { Component } from 'react'
import moment from "moment/moment";
import { actions } from "mirrorx";
import ReactEcharts from 'echarts-for-react';
import '../macarons';//引入图标主题
import './index.less';

class Bar extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentWillMount(){
        actions.echarts.getBarOption();
    }
    render(){
        let { barOption } = this.props;
        return (
            <div className="bar">
                <ReactEcharts theme={"macarons"} option={barOption} />
            </div>
        )
    }
}

export default Bar;