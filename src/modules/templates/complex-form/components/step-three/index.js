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

class StepThree extends Component{

    /**
     * 当组件的props变化是进入该方法
     * @param {*} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.validateFlag&&(!this.props.validateFlag)) {
            this.props.form.validateFields(['companyName','companyCode','companyDescription'],{},(error,values)=>{//这里需要写要检验的字段，否则全部校验
                this.props.validatefn(error,values)
            })
        }
        actions.complex.updateState({
            validateNum:99
        })
    }
    render(){
        const { getFieldProps, getFieldError} = this.props.form;
        return (
            <div className='step-three'>
                <Row>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>公司名称：</Label> <span className='mast'>*</span>
                            <FormControl placeholder='请输入公司名称'
                                {
                                    ...getFieldProps('companyName', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{ 
                                            required: true, 
                                            message: '请填写公司名称' 
                                        }],
                                    })
                                }
                            />
                            <span className='error'>
                                {
                                    getFieldError('companyName')
                                }
                            </span>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>公司编码：</Label><span className='mast'>*</span>
                            <FormControl placeholder='请输入公司编码'
                                {
                                    ...getFieldProps('companyCode', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{ 
                                            required: true, 
                                            message: '请填写公司编码' 
                                        }],
                                    })
                                }
                            />
                            <span className='error'>
                                {
                                    getFieldError('companyCode')
                                }
                            </span>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>公司描述：</Label>
                            <FormControl placeholder='请输入公司描述'
                                {
                                    ...getFieldProps('companyDescription', {
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

StepThree.propTypes = propTypes;
StepThree.defaultProps = defaultProps;
export default StepThree;