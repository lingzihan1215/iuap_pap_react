import React, { Component } from "react";
import { actions } from "mirrorx";
import { Row,Col,Button } from 'tinper-bee';
import Header from "components/Header";
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import Form from 'bee-form';
import './index.less';
import moment from "moment";
const { WeekPicker } = DatePicker;

class WeekPickerC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekDate:moment()
        }
    }
    getValue=()=>{
        this.props.form.validateFields((err, values) => {
            console.log(values);
        });
    }

    render() {
        const { getFieldProps } = this.props.form;
        const self = this;
        return (
            <div className = 'example' >
                <Header title = '周选择示例'/>
                <div className='file-src'>文件位置：src/modules/examples/week-picker</div>
                <Row className="example-ctn">
                    <Col md = {6} >
                        <WeekPicker placeholder="选择周"
                            {
                                ...getFieldProps('weekDate', {
                                    initialValue:'',
                                    onChange: function (v) {
                                        self.setState({
                                            weekDate: v
                                        })
                                    }
                                })
                            }
                        />
                    </Col>
                    <Col md = {6} >
                        <Button onClick={this.getValue}>
                            获取值
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(WeekPickerC);