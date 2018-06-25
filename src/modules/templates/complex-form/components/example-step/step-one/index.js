import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { actions } from 'mirrorx';
import PropTypes from 'prop-types';
import { FormControl, Label, Row, Col } from 'tinper-bee';
import Form from 'bee-form';
import './index.less';
const FormItem = Form.FormItem;

const propTypes = {
    validatefn: PropTypes.func,
    validateFlag:PropTypes.bool
};

const defaultProps = {
    validatefn: () => {},
    validateFlag:false,
};

class StepOne extends Component{

    /**
     * 当组件的props变化是进入该方法
     * @param {*} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.validateFlag&&(!this.props.validateFlag)) {
            this.props.form.validateFields(['projectName','projectCode','projectDescription'],{},(error,values)=>{//这里需要写要检验的字段，否则全部校验
                this.props.validatefn(error,values)
            })
        }
        actions.example.updateState({
            validateNum:99
        })
    }

    render(){
        const { getFieldProps, getFieldError} = this.props.form;
        return (
            <div className='step-one'>
                <Row>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>项目名称：</Label> <span className='mast'>*</span>
                            <FormControl placeholder='请输入项目名称'
                                {
                                    ...getFieldProps('projectName', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{ 
                                            required: true, 
                                            message: '请填写项目名称' 
                                        }],
                                    })
                                }
                            />
                            <span className='error'>
                                {
                                    getFieldError('projectName')
                                }
                            </span>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>项目编码：</Label><span className='mast'>*</span>
                            <FormControl placeholder='请输入项目编码'
                                {
                                    ...getFieldProps('projectCode', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{ 
                                            required: true, 
                                            message: '请填写项目编码' 
                                        }],
                                    })
                                }
                            />
                            <span className='error'>
                                {
                                    getFieldError('projectCode')
                                }
                            </span>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>项目描述：</Label>
                            <FormControl placeholder='请输入项目描述'
                                {
                                    ...getFieldProps('projectDescription', {
                                        initialValue: '',
                                    })
                                }
                            />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

StepOne.propTypes = propTypes;
StepOne.defaultProps = defaultProps;
export default StepOne;