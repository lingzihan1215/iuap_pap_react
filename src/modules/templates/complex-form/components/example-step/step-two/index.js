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

class StepTwo extends Component{

    /**
     * 当组件的props变化是进入该方法
     * @param {*} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.validateFlag&&(!this.props.validateFlag)) {
            this.props.form.validateFields(['userName','userCode','userDescription'],{},(error,values)=>{//这里需要写要检验的字段，否则全部校验
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
            <div className='step-two'>
                <Row>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>人员名称：</Label> <span className='mast'>*</span>
                            <FormControl placeholder='请输入人员名称'
                                {
                                    ...getFieldProps('userName', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{ 
                                            required: true, 
                                            message: '请填写人员名称' 
                                        }],
                                    })
                                }
                            />
                            <span className='error'>
                                {
                                    getFieldError('userName')
                                }
                            </span>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>人员编码：</Label><span className='mast'>*</span>
                            <FormControl placeholder='请输入人员编码'
                                {
                                    ...getFieldProps('userCode', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{ 
                                            required: true, 
                                            message: '请填写人员编码' 
                                        }],
                                    })
                                }
                            />
                            <span className='error'>
                                {
                                    getFieldError('userCode')
                                }
                            </span>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>人员描述：</Label>
                            <FormControl placeholder='请输入人员描述'
                                {
                                    ...getFieldProps('userDescription', {
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

StepTwo.propTypes = propTypes;
StepTwo.defaultProps = defaultProps;
export default StepTwo;