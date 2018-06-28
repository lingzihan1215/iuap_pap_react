import React, { Component } from 'react'
import moment from "moment/moment";
import { actions } from "mirrorx";
import ReactEcharts from 'echarts-for-react';
import Header from "components/Header";
import { Panel } from 'tinper-bee'
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
                <Header title="饼状图示例"/>
                <Panel>
                    <ReactEcharts theme={"macarons"} option={barOption} />
                </Panel>
            </div>
        )
    }
}

export default Bar;