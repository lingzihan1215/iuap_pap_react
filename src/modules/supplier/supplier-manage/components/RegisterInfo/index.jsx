import React, { Component } from 'react';
import UserInfo from '../UserInfo';
import EnterpriseInfo from '../EnterpriseInfo';
import ContactInfo from '../ContactInfo';

import './index.less';

class RegisterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <UserInfo />
                <EnterpriseInfo />
                <ContactInfo />
            </div>
        );
    }
}

export default RegisterInfo;