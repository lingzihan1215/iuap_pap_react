import React, { Component } from 'react';
import { Button, Row, Col } from 'tinper-bee';
import Form from 'bee-form';
import { actions } from 'mirrorx';
import AcUpload from 'ac-upload';
import './index.less';
const FormItem = Form.FormItem;

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
        return (
            <div>
                <AcUpload
                    action="/iuap_pap_quickstart/fileMananger/fastDfs/imgUpload"
                    multiple={true}
                    onError={this.handlerUploadError}
                    onSuccess={this.handlerUploadSuccess}
                >
                    <Button shape="border" colors="success">上传</Button>
                </AcUpload>
            </div>
        );
    }
}

export default Upload;