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

class StepThree extends Component{
    componentWillReceiveProps(nextProps) {
        if (nextProps.validateFlag&&(!this.props.validateFlag)) {
            this.props.form.validateFields(['name31'],{},(error,values)=>{
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
            <div className='step-three'>
                <FormItem>
                    <Label>注册资金：</Label>
                    <FormControl
                        {
                            ...getFieldProps('name31', {
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
                            getFieldError('name31')
                        }
                    </span>
                </FormItem>
            </div>
        )
    }
}

StepThree.propTypes = propTypes;
StepThree.defaultProps = defaultProps;
export default StepThree;