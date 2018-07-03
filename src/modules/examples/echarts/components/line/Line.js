import React, { Component } from 'react'
import moment from "moment/moment";
import { actions } from "mirrorx";
import ReactEcharts from 'echarts-for-react';
import Header from "components/Header";
import { Panel } from 'tinper-bee'
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
                <Header title="折线图示例"/>
                <Panel>
                    <ReactEcharts theme={"macarons"} option={lineOption} />
                </Panel>
            </div>
        )
    }
}

export default Line;