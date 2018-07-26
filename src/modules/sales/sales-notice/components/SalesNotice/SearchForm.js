import React, { Component } from 'react';
import { actions } from 'mirrorx';
import SearchPanel from 'components/SearchPanel';

import Form from 'bee-form';
import { Col, Row, FormControl, Label, Select, Radio } from "tinper-bee";
const FormItem = Form.FormItem;

import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'sales.SearchForm.title',
        defaultMessage: '查询客户信用资料清空',
    },
    code: {
        id: 'sales.customerCode',
        defaultMessage: '编码',
    },
    tips: {
        id: "sales.SearchForm.tips",
        defaultMessage: "客户编码格式不正确"
    }
});

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
                    title={<FormattedMessage {...messages.title} />}
                    search={this.search}>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label><FormattedMessage {...messages.code} /></Label>
                                <FormControl className='form-item' 
                                    {
                                    ...getFieldProps('search_id', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, 
                                            message: () => <FormattedMessage {...messages.tips} />
                                            
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