import React, { Component } from 'react';
import UserInfo from '../UserInfo';
import EnterpriseInfo from '../EnterpriseInfo';
import ContactInfo from '../ContactInfo';
import Form from 'bee-form';

import './index.less';

class RegisterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        console.log(this.props);
        return (
            <div>
                <UserInfo />
                <EnterpriseInfo />
                <ContactInfo />
            </div>
        );
    }
}

export default Form.createForm()(RegisterInfo);