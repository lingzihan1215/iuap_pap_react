import React, { Component } from 'react'
import moment from "moment/moment";
import { actions } from "mirrorx";
import ReactEcharts from 'echarts-for-react';
import '../macarons';//引入图标主题
import './index.less';

class Pie extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentWillMount(){
        actions.echarts.getPieOption();
    }
    render(){
        let { pieOption } = this.props;
        return (
            <div className="pie">
                <ReactEcharts theme={"macarons"} option={pieOption} />
            </div>
        )
    }
}

export default Pie;