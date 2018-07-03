import React, { Component } from 'react';
import { Button, Row, Col } from 'tinper-bee';
import { actions } from 'mirrorx';
import AcUpload from 'ac-upload';
import Header from "components/Header";
import './index.less';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handlerUploadSuccess = (data) => {
        console.log('获得后端返回附件路径数据：', data);
    }
    handlerUploadError = () => {
        console.log('上传出现了问题');
    }

    render() {
        // api 参考 https://github.com/tinper-acs/ac-upload
        return (
            <div className = 'example'>
                <Header title = '上传示例' / >
                    <Row className="example-ctn">
                        <Col md = {12} >
                            <AcUpload
                                action="/iuap_pap_quickstart/fileMananger/fastDfs/imgUpload"
                                multiple={true}
                                onError={this.handlerUploadError}
                                onSuccess={this.handlerUploadSuccess}
                            >
                                <Button shape="border" colors="success">上传</Button>
                            </AcUpload>  
                        </Col> 
                    </Row> 
            </div>
        );
    }
}

export default Upload;