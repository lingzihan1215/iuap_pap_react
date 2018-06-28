import React, { Component } from 'react'
import moment from "moment/moment";
import { actions } from "mirrorx";
import ReactEcharts from 'echarts-for-react';
import Header from "components/Header";
import { Panel } from 'tinper-bee'
import '../macarons';//引入图标主题
import './index.less';

class Radar extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentWillMount(){
        actions.echarts.getRadarOption();
    }
    render(){
        let { radarOption } = this.props;
        return (
            <div className="radar">
                <Header title="雷达图示例"/>
                <Panel>
                    <ReactEcharts theme={"macarons"} option={radarOption} />
                </Panel>    
            </div>
        )
    }
}

export default Radar;