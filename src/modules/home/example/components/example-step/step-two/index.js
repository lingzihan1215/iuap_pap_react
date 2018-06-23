import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { actions } from 'mirrorx';
import PropTypes from 'prop-types';
import { FormControl, Label } from 'tinper-bee';
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.validateFlag&&(!this.props.validateFlag)) {
            this.props.form.validateFields(['name21','name22','name23'],{},(error,values)=>{
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
                <FormItem>
                    <Label>注册资金：</Label>
                    <FormControl
                        {
                            ...getFieldProps('name21', {
                                initialValue: 10,
                                validateTrigger: 'onBlur',
                                rules: [{ 
                                    required: true, 
                                    message: '请填写注册资金' 
                                }],
                            })
                        }
                    />
                    <span className='error'>
                        {
                            getFieldError('name21')
                        }
                    </span>
                </FormItem>
                <FormItem>
                    <Label>注册资金：</Label>
                    <FormControl
                        {
                            ...getFieldProps('name22', {
                                initialValue: 10,
                                validateTrigger: 'onBlur',
                                rules: [{ 
                                    required: true, 
                                    message: '请填写注册资金' 
                                }],
                            })
                        }
                    />
                    <span className='error'>
                        {
                            getFieldError('name22')
                        }
                    </span>
                </FormItem>
                <FormItem>
                    <Label>注册资金：</Label>
                    <FormControl
                        {
                            ...getFieldProps('name23', {
                                initialValue: 10,
                                validateTrigger: 'onBlur',
                                rules: [{ 
                                    required: true, 
                                    message: '请填写注册资金' 
                                }],
                            })
                        }
                    />
                    <span className='error'>
                        {
                            getFieldError('name23')
                        }
                    </span>
                </FormItem>
            </div>
        )
    }
}

StepTwo.propTypes = propTypes;
StepTwo.defaultProps = defaultProps;
export default StepTwo;