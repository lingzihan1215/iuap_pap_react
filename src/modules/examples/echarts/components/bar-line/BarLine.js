import React, { Component } from 'react'
import moment from "moment/moment";
import { actions } from "mirrorx";
import ReactEcharts from 'echarts-for-react';
import Header from "components/Header";
import { Panel } from 'tinper-bee'
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
                <Header title="饼状折线图示例"/>  
                <div className='file-src'>文件位置：src/modules/examples/echarts/bar-line</div>
                <Panel>  
                    <ReactEcharts theme={"macarons"} option={barLineOption} />
                </Panel>
            </div>
        )
    }
}

export default BarLine;