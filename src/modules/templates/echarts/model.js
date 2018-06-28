import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service"; 
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils"; 

export default {
    // 确定 Store 中的数据模型作用域
    name: "echarts", 
    // 设置当前 Model 所需的初始化 state
    initialState: {  
        barOption:{},
        barLineOption:{},
        pieOption:{},
        lineOption:{},
        radarOption:{}
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state 
         * @param {*} data 
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }
    },
    effects: { 
        /**
         * 获得柱状图数据
         * @param {*} param 
         * @param {*} getState 
         */
        async getBarOption(param,getState){
            actions.echarts.updateState({
                barOption:{
                    title : {
                        text: '某地区蒸发量和降水量',
                        subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['蒸发量','降水量']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'蒸发量',
                            type:'bar',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'降水量',
                            type:'bar',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                            markPoint : {
                                data : [
                                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                }                 
            })
        },
        /**
         * 获得折线图数据
         * @param {*} param 
         * @param {*} getState 
         */
        async getLineOption(param,getState){
            actions.echarts.updateState({
                lineOption:{
                    title : {
                        text: '未来一周气温变化',
                        subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高气温','最低气温']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'最高气温',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'最低气温',
                            type:'line',
                            data:[1, -2, 2, 5, 3, 2, 0],
                            markPoint : {
                                data : [
                                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                }                
            })
        },
        /**
         * 获得饼状图图数据
         * @param {*} param 
         * @param {*} getState 
         */
        async getPieOption(params,getState){
            actions.echarts.updateState({
                pieOption:{
                    title : {
                        text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            magicType : {
                                show: true, 
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'left',
                                        max: 1548
                                    }
                                }
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    series : [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                }              
            })
        },
        /**
         * 获得饼状图图数据
         * @param {*} param 
         * @param {*} getState 
         */
        async getBarLineOption(param,getState){
            actions.echarts.updateState({
                barLineOption:{
                    tooltip : {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    legend: {
                        data:['蒸发量','降水量','平均温度']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name : '水量',
                            axisLabel : {
                                formatter: '{value} ml'
                            }
                        },
                        {
                            type : 'value',
                            name : '温度',
                            axisLabel : {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series : [
                
                        {
                            name:'蒸发量',
                            type:'bar',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                        },
                        {
                            name:'降水量',
                            type:'bar',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name:'平均温度',
                            type:'line',
                            yAxisIndex: 1,
                            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                        }
                    ]
                }              
            })
        },
        /**
         * 获得饼状图图数据
         * @param {*} param 
         * @param {*} getState 
         */
        async getRadarOption(param,getState){
            actions.echarts.updateState({
                radarOption:{
                    title : {
                        text: '预算 vs 开销',
                        subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'right',
                        y : 'bottom',
                        data:['预算分配（Allocated Budget）','实际开销（Actual Spending）']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    polar : [
                       {
                           indicator : [
                               { text: '销售（sales）', max: 6000},
                               { text: '管理（Administration）', max: 16000},
                               { text: '信息技术（Information Techology）', max: 30000},
                               { text: '客服（Customer Support）', max: 38000},
                               { text: '研发（Development）', max: 52000},
                               { text: '市场（Marketing）', max: 25000}
                            ]
                        }
                    ],
                    calculable : true,
                    series : [
                        {
                            name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            data : [
                                {
                                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                                    name : '预算分配（Allocated Budget）'
                                },
                                 {
                                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                                    name : '实际开销（Actual Spending）'
                                }
                            ]
                        }
                    ]
                }                              
            })
        },
    }
};