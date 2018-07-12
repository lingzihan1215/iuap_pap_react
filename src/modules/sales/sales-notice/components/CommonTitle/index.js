import React, { Component } from 'react';
import Form from 'bee-form';
import { Icon } from "tinper-bee";
import PropTypes from 'prop-types'

import './index.css'

class CommonTitle extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let { type, title, children } = this.props;
        return  (
            <div className="commont-title">
                <Icon className="title-icon" type={type}  />
                <span>{title}</span>
                <div className="common-title-container">{children}</div>
            </div>
        )
    }
}


CommonTitle.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element
}

CommonTitle.defaultProps = {
    type: "",
    title: ""
}

export default CommonTitle
