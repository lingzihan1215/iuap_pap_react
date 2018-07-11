import React, { Component } from 'react';
import Form from 'bee-form';
import { Icon } from "tinper-bee";
import PropTypes from 'prop-types'

import './index.css'

const CommonTitle = ({ type, title }) => (
    <div className="commont-title">
        <Icon type={type}  />
        <span>{title}</span>
    </div>
)

CommonTitle.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

CommonTitle.defaultProps = {
    type: "",
    title: ""
}

export default CommonTitle
