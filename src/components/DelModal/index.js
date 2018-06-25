import React, { Component } from 'react';
import { Button,Modal } from 'tinper-bee';
import PropTypes from 'prop-types';
import './index.less';
import classnames from 'classnames';
/**
 * 部分不能通过this.props.form.resetFields()清空的组件，需要传reset方法，在reset方法中自行清空
 */
const propTypes = {
    modalTitle:PropTypes.string,//删除modal标题
    modalContent:PropTypes.string,//简单内容可直接传字符串，复杂内容写在children里
    confirmFn:PropTypes.func,//点击确认按钮的回调
    cancelFn:PropTypes.func,//点击取消的回调
    confirmName:PropTypes.string,
    cancelFnName:PropTypes.string,
};

const defaultProps = {
    modalTitle:'温馨提示',
    modalContent:'确认要删除么？',
    confirmFn:()=>{

    },
    cancelFn:()=>{
        
    },
    confirmName:'确定',
    cancelFnName:'取消'
};


class DelModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    close=()=> {
        this.setState({
            showModal: false
        });
        this.props.cancelFn();
    }
    onConfirm=()=> {
        this.setState({
            showModal: false
        });
        this.props.confirmFn();
    }
    open=()=> {
        this.setState({
            showModal: true
        });
    }
    render() {
        const {children,className,modalContent,modalTitle } = this.props;
        let classes = 'del-confrim';
        if(className){
            classes += ' '+className
        }
        return (
            <span className={classes}>
                <span className="del-modal-title" onClick={this.open}>
                    {children}
                </span>
                <Modal className="del-confrim-modal"
                    show = { this.state.showModal }
                    onHide = { this.close } >
                    <Modal.Header>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {modalContent}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={ this.close } size='sm' style={{'marginRight':'15px'}}>取消</Button>
                        <Button onClick={ this.onConfirm } size='sm'  colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>
            </span>
            
        )
    }
}
DelModal.propTypes = propTypes;
DelModal.defaultProps = defaultProps;
export default DelModal;
