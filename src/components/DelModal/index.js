import React, { Component } from 'react';
import { Button,Modal } from 'tinper-bee';
import PropTypes from 'prop-types';
import './index.less';
import classnames from 'classnames';

const propTypes = {
    modalTitle:PropTypes.string,//删除modal标题
    modalContent:PropTypes.node,//modal内容，可传字符串和dom
    confirmFn:PropTypes.func,//点击确认按钮的回调
    cancelFn:PropTypes.func,//点击取消的回调
    confirmName:PropTypes.string,
    cancelFnName:PropTypes.string,
    showFooter:PropTypes.bool,//是否显示确认取消按钮
    showTitle:PropTypes.bool,//是否显示modal标题
};

const defaultProps = {
    modalTitle:'温馨提示',
    modalContent:'确认要删除么？',
    confirmFn:()=>{

    },
    cancelFn:()=>{
        
    },
    confirmName:'确定',
    cancelFnName:'取消',
    showFooter:true,
    showTitle:true,
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
        const {children,className,modalContent,modalTitle,confirmName,cancelFnName,showTitle,showFooter } = this.props;
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
                    {
                        showTitle?(<Modal.Header>
                            <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>):''
                    }
                    <Modal.Body>
                        {modalContent}
                    </Modal.Body>
                    
                    {
                        showFooter?(<Modal.Footer>
                            <Button onClick={ this.close } size='sm' style={{'marginRight':'15px'}}>取消</Button>
                            <Button onClick={ this.onConfirm } size='sm'  colors="primary">{confirmName}</Button>
                        </Modal.Footer>):''
                    }
                </Modal>
            </span>
            
        )
    }
}
DelModal.propTypes = propTypes;
DelModal.defaultProps = defaultProps;
export default DelModal;
