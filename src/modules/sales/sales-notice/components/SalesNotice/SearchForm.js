import React, { Component } from 'react';
import { actions } from 'mirrorx';

import SearchPanel from 'components/SearchPanel';

import Form from 'bee-form';
import { Col, Row, FormControl, Label, Select, Radio } from "tinper-bee";
const FormItem = Form.FormItem;

class SearchForm extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    search = (err, values) => {
        actions.salesNotice.updateState({search_id: values.search_id});
        actions.salesNotice.searchCustomerInfo({search_id: values.search_id});
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className="search-form">
                <SearchPanel
                    className='example-form'
                    form={this.props.form}
                    searchOpen={true}
                    title="查询客户信用资料"
                    search={this.search}>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>客户代号：</Label>
                                <FormControl className='form-item' 
                                    {
                                    ...getFieldProps('search_id', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, 
                                            message: "客户代码格式不正确"
                                            
                                        }]
                                    })
                                    }
                                />
                                <span className='error'>
                                    {getFieldError('search_id')}
                                </span>
                            </FormItem>
                        </Col>
                    </Row>
                </SearchPanel>
            </div>
        )
    }
}

export default Form.createForm()(SearchForm) 