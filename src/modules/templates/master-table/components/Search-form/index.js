import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Col, Row,FormControl, Label, Select, Radio } from "tinper-bee";
import Form from 'bee-form';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import SearchPanel from 'components/SearchPanel';
const FormItem = Form.FormItem;
const { RangePicker } = DatePicker;
import './index.less'

class Searchform extends Component {
    constructor(props){
        super(props)
        this.state = {
        petId:'',
        quantity:'',
        shipDate:'',
        status:'',
        complete:'',
        }
    }
    componentWillMount(){
        // 获得订单类型列表数据
        actions.mastertable.getOrderTypes();
    }
    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = (error,values) => {
        this.props.form.validateFields((err, values) => {
            values.pageIndex = this.props.pageIndex || 0;
            values.pageSize = this.props.pageSize || 10;

            actions.mastertable.loadList(values);
        });

        
    }
    /**
     * 重置
     */
    reset = () => {
        this.setState({
            petId:'',
            quantity:'',
            shipDate:'',
            status:'',
            complete:'',
        })
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let { orderTypes } = this.props;
        let _this = this;
        return (
            <SearchPanel 
                className='search-form' 
                form={this.props.form} 
                reset={this.reset} 
                search={this.search}>
                <Row>

		            <Col md={4} xs={6}>
                        <FormItem>
                            <Label>宠物标识</Label>
                            <FormControl
                                {
                                    ...getFieldProps('petId', {
                                        initialValue: '',
                                    })
                                }
                            />
                        </FormItem>
                    </Col>
		            <Col md={4} xs={6}>
                        <FormItem>
                            <Label>单价</Label>
                            <FormControl
                                {
                                    ...getFieldProps('quantity', {
                                        initialValue: '',
                                    })
                                }
                            />
                        </FormItem>
                    </Col>
		            <Col md={4} xs={6}>
                        <FormItem>
                            <Label>发货日期</Label>
                            <RangePicker
                            defaultValue={this.state.shipDate}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            {
                                ...getFieldProps('shipDate', {
                                    initialValue:'',
                                    onChange:  (v)=> {
                                        this.setState({
                                            shipDate: v
                                        })
                                    }
                                })
                            }
                            />
                        </FormItem>
                    </Col>
		            <Col md={4} xs={6}>
                        <FormItem>
                            <Label>状态</Label>
                            <Radio.RadioGroup
                            selectedValue={this.state.status||'0'}
                                {
                                    ...getFieldProps('status', {
                                        initialValue: '',
                                        onChange(value) {
                                            _this.setState({ status: value });
                                        },
                                    })
                                }
                            >
                                <Radio value="" >全部</Radio>
                                    <Radio value="0">开发</Radio>
                                    <Radio value="1">测试</Radio>
                                    <Radio value="2">发布</Radio>
                            </Radio.RadioGroup>
                        </FormItem>
                    </Col>
		            <Col md={4} xs={6}>
                        <FormItem>
                            <Label>完成状态</Label>
                            <FormControl
                                {
                                    ...getFieldProps('complete', {
                                        initialValue: '',
                                    })
                                }
                            />
                        </FormItem>
                    </Col>
                </Row>
            </SearchPanel>
        )
    }
}

export default Form.createForm()(Searchform)