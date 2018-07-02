import React, { Component } from "react";
import { actions } from "mirrorx";
import { Row, Col } from 'tinper-bee';
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
    
    
    render() {
        const editorProps = {
            height: 500,
            contentFormat: 'html',
            initialContent: '<p>Hello World!</p>',
            onChange: this.handleChange
        }
        return (
            <div className='editor-example'>
                <Header title='富文本编辑器示例' />
                <div className='edit-panel'>
                    <Row >
                        <Col md={12}>
                            <BraftEditor {...editorProps}/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Editor;
