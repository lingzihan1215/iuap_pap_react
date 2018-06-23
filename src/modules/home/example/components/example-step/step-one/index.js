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

class StepOne extends Component{
    componentWillReceiveProps(nextProps) {
        if (nextProps.validateFlag&&(!this.props.validateFlag)) {
            this.props.form.validateFields(['name11','name12'],{},(error,values)=>{
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
                <FormItem>
                    <Label>1</Label>
                    <FormControl
                        {
                            ...getFieldProps('name11', {
                                initialValue: '',
                                validateTrigger: 'onBlur',
                                rules: [{ 
                                    required: true, 
                                    message: '请填写注册资金' 
                                }],
                            })
                        }
                    />
                </FormItem>
                <FormItem>
                    <Label>2</Label>
                    <FormControl
                        {
                            ...getFieldProps('name12', {
                                initialValue: 10,
                                validateTrigger: 'onBlur',
                                rules: [{ 
                                    required: true, 
                                    message: '请填写注册资金' 
                                }],
                            })
                        }
                    />
                </FormItem>
                
            </div>
        )
    }
}

StepOne.propTypes = propTypes;
StepOne.defaultProps = defaultProps;
export default StepOne;