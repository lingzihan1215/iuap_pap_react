import React, { Component } from 'react'
import moment from "moment/moment";
import { actions } from "mirrorx";
import ReactEcharts from 'echarts-for-react';
import Header from "components/Header";
import { Panel } from 'tinper-bee'
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
                <Header title="饼状图示例"/>
                <div className='file-src'>文件位置：src/modules/examples/echarts/pie</div>
                <Panel>
                    <ReactEcharts theme={"macarons"} option={pieOption} />
                </Panel>
            </div>
        )
    }
}

export default Pie;