import React, {
    Component
} from "react";
import {
    actions
} from "mirrorx";
import {
    Row,
    Col
} from 'tinper-bee';
import Header from "components/Header";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import './index.less';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleChange = (content) => {
        console.log(content)
    }

    validateFn = (file) => {
        console.log(file);
        return true;
    }

    uploadFn = (param) => {
        const serverURL = 'https://www.baidu.com/'//文件上传地址
        const xhr = new XMLHttpRequest
        const fd = new FormData()

        // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
        console.log(param.libraryId)

        const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            param.success({
                url: xhr.responseText,
                meta: {
                    id: 'xxx',
                    title: 'xxx',
                    alt: 'xxx',
                    loop: false, // 指定音视频是否循环播放
                    autoPlay: true, // 指定音视频是否自动播放
                    controls: true, // 指定音视频是否显示控制栏
                    poster: 'http://xxx/xx.png', // 指定视频播放器的封面
                }
            })
        }

        const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
        }

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
                msg: 'unable to upload.'
            })
        }

        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)

        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)
    }

    render() {
        // api 参考 https://github.com/margox/braft-editor
        const editorProps = {
            height: 500,
            contentFormat: 'html',
            initialContent: '<p>Hello World!</p>',
            onChange: this.handleChange,
            media: {
                allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
                image: true, // 开启图片插入功能
                video: true, // 开启视频插入功能
                audio: true, // 开启音频插入功能
                validateFn: this.validateFn, //上传校验，如果return false则不校验
                uploadFn: this.uploadFn,
            }
        }
        return ( 
            <div className = 'example'>
                <Header title = '富文本编辑器示例' / >
                    <Row className="example-ctn">
                        <Col md = {12} >
                         <BraftEditor { ...editorProps}/> 
                        </Col> 
                    </Row> 
            </div>
        )
    }
}

export default Editor;