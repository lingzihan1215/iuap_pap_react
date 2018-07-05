import React, { Component } from 'react';
import { Button, Row, Col } from 'tinper-bee';
import { actions } from 'mirrorx';
import AcUpload from 'ac-upload';
import Header from "components/Header";
import DelModal from "components/DelModal";
import './index.less';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    confirm = () => {
        alert('确认按钮的回调');
    }
    cancel = () => {
        alert('取消按钮的回调');
    }

    render() {
        // api 参考 /src/components/DelModal
        return (
            <div className = 'example'>
                <Header title = '确认删除模态框示例' / >
                    <Row className="example-ctn">
                        <Col md = {12} >
                            <DelModal confirmFn={this.confirm} cancelFn={this.cancel}>
                                <Button>
                                    删除
                                </Button>
                            </DelModal>
                        </Col> 
                    </Row> 
            </div>
        );
    }
}

export default Upload;