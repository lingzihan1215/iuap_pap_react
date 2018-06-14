import React, { Component } from "react";
import { actions } from "mirrorx";
import { Table, Button, Col, Row, FormControl, InputNumber, Popconfirm, Message, Popover, Checkbox, Icon } from "tinper-bee";
import NoData from 'components/NoData';
import Form from 'bee-form';
import './list.less';


class List extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount = () => {

    }

    render() {
        let { list } = this.props;
        return (
            <div className='resource-research-wrap'>
                资源调查表
            </div>
        )
    }
}

export default Form.createForm()(List);
