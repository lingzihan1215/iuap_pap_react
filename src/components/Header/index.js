import React, { Component } from 'react';
import { Col, Row } from 'tinper-bee';
import { FormattedMessage, defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import './index.less';
import classnames from 'classnames';

// const messages = defineMessages({
//     back: {
//         id: 'Header.back',
//         defaultMessage: '返回',
//     },
// });

const propTypes = {
    back: PropTypes.bool,
    backFn: PropTypes.func,
    title: PropTypes.string.isRequired
};

const defaultProps = {
    back: false,
    backFn: () => {
        window.history.go(-1);
    },
    title: ''
};

const headerStyle = classnames({ 
    'title': true,
    'title-develop': (__MODE__ == 'development') ? true: false 
}); 

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}

    render() {
        const { backFn, title, back, children } = this.props;
        return (
            <Row className={headerStyle}>
                <Col xs={12}>
                    {
                        back ? (
                            <span onClick={backFn} className="back-icon">
                                <i className={classnames({ 'uf uf-arrow-left pull-left': true, 'hide': !back })} />
                                <FormattedMessage id="Header.back" defaultMessage="返回" />
                        </span>) : ''
                    }
                    <span className="main-title">
                        {title}
                    </span>
                    {children}
                </Col>
            </Row>
        )
    }
}
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;
